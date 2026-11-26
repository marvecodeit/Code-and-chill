import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent, type TouchEvent } from 'react'
import { gsap } from 'gsap'
import { Arrow } from '../components/Arrow'
import BrandMark from '../components/BrandMark'
import { scenes, type SceneId } from './sceneConfig'
import { SceneContent } from './SceneContent'
import './Experience.css'

type TouchStart = { x: number; y: number; scrollable: boolean } | null

export default function ImmersiveExperience() {
  const [active, setActive] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightMode, setLightMode] = useState(false)
  const [webglAvailable, setWebglAvailable] = useState(true)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasHostRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const fragmentRef = useRef<HTMLDivElement>(null)
  const worldRef = useRef<import('./SceneWorld').SceneWorld | null>(null)
  const lockedRef = useRef(false)
  const contentDoneRef = useRef(true)
  const worldDoneRef = useRef(true)
  const touchStartRef = useRef<TouchStart>(null)
  const activeRef = useRef(active)
  const lightModeRef = useRef(lightMode)

  const scene = scenes[active]

  useLayoutEffect(() => {
    activeRef.current = active
  }, [active])

  useLayoutEffect(() => {
    lightModeRef.current = lightMode
    worldRef.current?.setTheme(lightMode)
  }, [lightMode])

  useEffect(() => {
    const host = canvasHostRef.current
    if (!host) return
    let cancelled = false
    let world: import('./SceneWorld').SceneWorld | null = null
    import('./SceneWorld').then(({ SceneWorld }) => {
      if (cancelled) return
      try {
        world = new SceneWorld(host, activeRef.current)
        worldRef.current = world
        world.setTheme(lightModeRef.current)
        gsap.fromTo(world.canvas, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' })
      } catch {
        setWebglAvailable(false)
      }
    }).catch(() => setWebglAvailable(false))
    return () => {
      cancelled = true
      world?.dispose()
      worldRef.current = null
    }
  }, [])

  useLayoutEffect(() => {
    const element = contentRef.current
    if (!element) return
    const reveals = element.querySelectorAll<HTMLElement>('[data-reveal]')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    contentDoneRef.current = false
    const timeline = gsap.timeline({ onComplete: () => {
      contentDoneRef.current = true
      if (worldDoneRef.current) lockedRef.current = false
    } })
    timeline.fromTo(element, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: reduced ? 0 : 0.36, ease: 'power2.out' })
      .fromTo(reveals, { opacity: 0, y: 22, clipPath: 'inset(0 0 70% 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: reduced ? 0 : 0.58, stagger: reduced ? 0 : 0.065, ease: 'power3.out', clearProps: 'clipPath,transform' }, 0.08)
    return () => { timeline.kill() }
  }, [active])

  function goTo(index: number) {
    const next = Math.max(0, Math.min(scenes.length - 1, index))
    if (next === activeRef.current || lockedRef.current) return
    lockedRef.current = true
    contentDoneRef.current = false
    worldDoneRef.current = false
    setMenuOpen(false)
    const currentContent = contentRef.current
    const direction = next > activeRef.current ? 1 : -1

    if (worldRef.current) {
      worldRef.current.transitionTo(next, () => {
        worldDoneRef.current = true
        if (contentDoneRef.current) lockedRef.current = false
      })
    } else worldDoneRef.current = true

    if (!currentContent) {
      setActive(next)
      return
    }
    gsap.to(currentContent, {
      x: direction > 0 ? -48 : 48,
      opacity: 0,
      clipPath: direction > 0 ? 'polygon(0 0, 100% 0, 82% 100%, 0 100%)' : 'polygon(18% 0, 100% 0, 100% 100%, 0 100%)',
      duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.24,
      ease: 'power2.in',
      onComplete: () => setActive(next),
    })
    const fragments = fragmentRef.current?.children
    if (fragments && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const transitions = [
        { from: { scaleY: 0, scaleX: 0.92, rotation: 0 }, to: { scaleY: 1, scaleX: 1, rotation: 0, transformOrigin: direction > 0 ? 'center top' : 'center bottom' } },
        { from: { scaleX: 0, scaleY: 0.94, rotationY: 34 }, to: { scaleX: 1, scaleY: 1, rotationY: 0, transformOrigin: direction > 0 ? 'left center' : 'right center' } },
        { from: { scale: 0.08, rotation: direction > 0 ? 7 : -7 }, to: { scale: 1, rotation: 0, transformOrigin: 'center center' } },
        { from: { scaleY: 0.08, scaleX: 0.8, rotation: direction > 0 ? -5 : 5 }, to: { scaleY: 1, scaleX: 1, rotation: 0, transformOrigin: 'center center' } },
        { from: { scaleX: 0, scaleY: 0.94, rotationY: -28 }, to: { scaleX: 1, scaleY: 1, rotationY: 0, transformOrigin: direction > 0 ? 'right center' : 'left center' } },
      ]
      const transition = transitions[next]
      const fragmentTimeline = gsap.timeline()
      fragmentTimeline.fromTo(fragments, { ...transition.from, opacity: 0 }, {
        ...transition.to,
        opacity: 0.52,
        duration: 0.26,
        stagger: { each: 0.014, from: direction > 0 ? 'start' : 'end' },
        ease: 'power3.in',
        onComplete: () => {
          gsap.to(fragments, { scaleY: 0, opacity: 0, duration: 0.34, delay: 0.12, stagger: { each: 0.013, from: direction > 0 ? 'end' : 'start' }, ease: 'power3.out' })
        },
      }, 0)
    }
  }

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const onWheel = (event: WheelEvent) => {
      const scroller = (event.target as HTMLElement).closest<HTMLElement>('[data-scene-scroll]')
      if (scroller) {
        const canScroll = event.deltaY > 0
          ? scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight - 2
          : scroller.scrollTop > 2
        if (canScroll) return
      }
      event.preventDefault()
      const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX
      if (Math.abs(delta) > 26) goTo(activeRef.current + (delta > 0 ? 1 : -1))
    }
    stage.addEventListener('wheel', onWheel, { passive: false })
    return () => stage.removeEventListener('wheel', onWheel)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (target.matches('input, textarea, select, [contenteditable="true"]') || (event.key === ' ' && target.closest('button, a, [role="button"]'))) return
      const nextKeys = ['ArrowDown', 'ArrowRight', 'PageDown', ' ']
      const previousKeys = ['ArrowUp', 'ArrowLeft', 'PageUp']
      if (nextKeys.includes(event.key)) {
        event.preventDefault()
        goTo(activeRef.current + 1)
      } else if (previousKeys.includes(event.key)) {
        event.preventDefault()
        goTo(activeRef.current - 1)
      } else if (event.key === 'Home') {
        event.preventDefault()
        goTo(0)
      } else if (event.key === 'End') {
        event.preventDefault()
        goTo(scenes.length - 1)
      } else if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, scrollable: Boolean((event.target as HTMLElement).closest('[data-scene-scroll]')) }
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const start = touchStartRef.current
    touchStartRef.current = null
    if (!start || start.scrollable) return
    const touch = event.changedTouches[0]
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 56) return
    goTo(activeRef.current + ((Math.abs(dx) > Math.abs(dy) ? dx < 0 : dy < 0) ? 1 : -1))
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect()
    worldRef.current?.setPointer(((event.clientX - bounds.left) / bounds.width - 0.5) * 2, -((event.clientY - bounds.top) / bounds.height - 0.5) * 2)
  }

  return <main className={lightMode ? 'immersive-site light-mode' : 'immersive-site'} ref={stageRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onPointerMove={handlePointerMove}>
    <div className="world-host" ref={canvasHostRef} aria-hidden="true" />
    {!webglAvailable && <div className="webgl-fallback" aria-hidden="true"><span /><span /><span /></div>}
    <div className="stage-grain" aria-hidden="true" />

    <a className="skip-link" href="#scene-title" onClick={event => { event.preventDefault(); document.getElementById('scene-title')?.focus() }}>Skip to current scene</a>

    <header className="experience-header">
      <button className="experience-brand" onClick={() => goTo(0)} aria-label="Go to Code and Chill home"><BrandMark /><span>CODE & CHILL <i>LAGOS</i></span></button>
      <nav className={menuOpen ? 'scene-nav open' : 'scene-nav'} aria-label="Experience scenes">
        {scenes.map((item, index) => <button key={item.id} className={active === index ? 'scene-nav-item active' : 'scene-nav-item'} aria-current={active === index ? 'step' : undefined} data-scene-nav data-index={index} onClick={() => goTo(index)}><span>{item.index}</span>{item.label}</button>)}
      </nav>
      <button className="theme-switch" onClick={() => setLightMode(!lightMode)} aria-label={`Switch to ${lightMode ? 'dark' : 'light'} mode`} title={`Switch to ${lightMode ? 'dark' : 'light'} mode`}><span aria-hidden="true">{lightMode ? '◐' : '☼'}</span><span>{lightMode ? 'DARK' : 'LIGHT'}</span></button>
      <button className="mobile-menu-toggle" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close scene menu' : 'Open scene menu'} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      <div className="header-side-label">INDEPENDENT BY DESIGN <span>✳</span></div>
    </header>

    <div className="scene-mark" aria-hidden="true"><span>{scene.index}</span><i />{scene.label}</div>
    <div className="world-caption" aria-hidden="true"><span>CODE / COMMUNITY / LAGOS</span><span>06° 27′ N&nbsp; 03° 23′ E</span></div>

    <div id="scene-content" className={`scene-content scene-${scene.id}`} ref={contentRef} aria-live="polite" aria-atomic="true">
      <SceneContent scene={scene.id as SceneId} onNavigate={goTo} />
    </div>

    <div className="scene-controls" aria-label="Scene controls">
      <button className="control-arrow" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous scene"><Arrow diagonal /></button>
      <div className="progress-wrap" role="progressbar" aria-label="Experience progress" aria-valuemin={1} aria-valuemax={scenes.length} aria-valuenow={active + 1}><span>{scene.index}</span><div className="progress-track"><i style={{ width: `${((active + 1) / scenes.length) * 100}%` }} /></div><span>05</span></div>
      <button className="control-arrow next" onClick={() => goTo(active + 1)} disabled={active === scenes.length - 1} aria-label="Next scene"><Arrow /></button>
    </div>
    <p className="input-hint"><span className="hint-wheel">↕</span> SCROLL TO EXPLORE <span className="hint-separator">·</span> USE ARROW KEYS</p>
    <footer className="experience-footer"><span>© 2026 CODE & CHILL LAGOS</span><span>BUILD / LEARN / SHARE / CHILL</span></footer>
    <div className="transition-grid" ref={fragmentRef} aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <span key={index} />)}</div>
  </main>
}
