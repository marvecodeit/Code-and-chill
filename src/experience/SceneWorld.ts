import * as THREE from 'three'
import { gsap } from 'gsap'

type SceneGroup = THREE.Group & { animatedObjects: THREE.Object3D[] }
type MaterialLike = THREE.Material & { opacity: number }

const ACCENT = '#c8ff4d'
const WHITE = '#f5f5f5'
const MUTED = '#898989'
const CAMERA_STOPS = [0, 3.8, 7.6, 11.4, 15.2]

function makeMaterial(color: string, wireframe = false) {
  return new THREE.MeshStandardMaterial({ color, wireframe, metalness: 0.34, roughness: wireframe ? 0.42 : 0.27, transparent: true, opacity: 0.88 })
}

function addMesh(group: SceneGroup, geometry: THREE.BufferGeometry, color: string, x: number, y: number, z: number, wireframe = false) {
  const mesh = new THREE.Mesh(geometry, makeMaterial(color, wireframe))
  mesh.position.set(x, y, z)
  group.add(mesh)
  group.animatedObjects.push(mesh)
  return mesh
}

function makeGroup(scene: THREE.Scene, position: number): SceneGroup {
  const group = new THREE.Group() as SceneGroup
  group.position.x = position
  group.animatedObjects = []
  group.visible = false
  scene.add(group)
  return group
}

function buildHome(scene: THREE.Scene) {
  const group = makeGroup(scene, CAMERA_STOPS[0])
  const knot = addMesh(group, new THREE.TorusKnotGeometry(1.02, 0.26, 140, 18, 2, 3), ACCENT, 2.5, 0.04, -0.25)
  knot.rotation.set(0.3, -0.35, 0.15)
  addMesh(group, new THREE.IcosahedronGeometry(1.48, 1), WHITE, 2.5, 0.04, -0.4, true)
  for (let index = 0; index < 7; index += 1) {
    const angle = (index / 7) * Math.PI * 2
    const cube = addMesh(group, new THREE.BoxGeometry(0.12, 0.12, 0.12), index % 2 ? MUTED : ACCENT, 2.5 + Math.cos(angle) * 2, Math.sin(angle) * 1.45, 0)
    cube.rotation.set(angle, -angle, angle * 0.5)
  }
  return group
}

function buildCommunity(scene: THREE.Scene) {
  const group = makeGroup(scene, CAMERA_STOPS[1])
  const points = [[1.4, 1.2], [2.4, 0.35], [3.6, 1.15], [1.25, -0.65], [2.45, -1.15], [3.8, -0.55], [2.45, 1.45]]
  const sphereGeometry = new THREE.SphereGeometry(0.105, 12, 10)
  const linePositions: number[] = []
  const pairs = [[0, 1], [1, 2], [1, 3], [1, 4], [2, 6], [3, 4], [4, 5], [5, 2], [4, 6]]
  pairs.forEach(([a, b]) => linePositions.push(points[a][0], points[a][1], -0.1, points[b][0], points[b][1], -0.1))
  const lineGeometry = new THREE.BufferGeometry()
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
  group.add(new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.6 })))
  points.forEach(([x, y], index) => {
    const node = addMesh(group, sphereGeometry, index === 1 || index === 4 ? ACCENT : WHITE, x, y, 0)
    group.animatedObjects.push(node)
  })
  addMesh(group, new THREE.TorusGeometry(1.72, 0.008, 4, 80), MUTED, 2.55, 0.05, -0.35, true).rotation.x = Math.PI / 2.7
  return group
}

function buildEvents(scene: THREE.Scene) {
  const group = makeGroup(scene, CAMERA_STOPS[2])
  const cards = [
    { x: 1.3, y: 0.85, color: ACCENT }, { x: 2.65, y: 0.25, color: WHITE }, { x: 3.95, y: -0.2, color: MUTED },
    { x: 1.45, y: -0.75, color: MUTED }, { x: 2.75, y: -1.15, color: ACCENT }, { x: 4.05, y: 0.95, color: WHITE },
  ]
  cards.forEach(({ x, y, color }, index) => {
    const card = addMesh(group, new THREE.BoxGeometry(0.88, 0.58, 0.07), color, x, y, index % 2 ? -0.2 : 0)
    card.rotation.z = (index % 2 ? 1 : -1) * 0.1
    group.add(new THREE.LineSegments(new THREE.EdgesGeometry(card.geometry), new THREE.LineBasicMaterial({ color: index % 2 ? ACCENT : WHITE, transparent: true, opacity: 0.78 })))
  })
  addMesh(group, new THREE.TorusGeometry(0.62, 0.014, 5, 64), ACCENT, 3.0, 0, -0.7, true).rotation.y = 0.7
  return group
}

function buildActivities(scene: THREE.Scene) {
  const group = makeGroup(scene, CAMERA_STOPS[3])
  const central = addMesh(group, new THREE.OctahedronGeometry(0.72, 0), ACCENT, 2.7, 0, -0.1, true)
  central.rotation.set(0.3, 0.3, 0.2)
  for (let index = 0; index < 6; index += 1) {
    const angle = (index / 6) * Math.PI * 2
    const x = 2.7 + Math.cos(angle) * 1.85
    const y = Math.sin(angle) * 1.28
    const geometry = index % 2 ? new THREE.TorusGeometry(0.22, 0.045, 8, 18) : new THREE.BoxGeometry(0.28, 0.28, 0.28)
    addMesh(group, geometry, index % 2 ? WHITE : ACCENT, x, y, 0)
    const line = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(2.7, 0, -0.1), new THREE.Vector3(x, y, -0.1)])
    group.add(new THREE.Line(line, new THREE.LineBasicMaterial({ color: MUTED, transparent: true, opacity: 0.42 })))
  }
  return group
}

function buildJoin(scene: THREE.Scene) {
  const group = makeGroup(scene, CAMERA_STOPS[4])
  ;[1.8, 1.25, 0.68].forEach((radius, index) => {
    const ring = addMesh(group, new THREE.TorusGeometry(radius, 0.012, 5, 100), index === 1 ? ACCENT : WHITE, 2.5, 0, 0, true)
    ring.rotation.set(index * 0.52, index * 0.7, index * 0.35)
  })
  addMesh(group, new THREE.IcosahedronGeometry(0.17, 1), ACCENT, 2.5, 0, 0)
  return group
}

export class SceneWorld {
  private readonly renderer: THREE.WebGLRenderer
  private readonly scene = new THREE.Scene()
  private readonly camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
  private readonly groups: SceneGroup[]
  private readonly pointer = new THREE.Vector2()
  private readonly reduceMotion: boolean
  readonly canvas: HTMLCanvasElement
  private frame = 0
  private active = 0
  private disposed = false
  private transitionTimeline: gsap.core.Timeline | null = null
  private cameraBaseX = 0
  private readonly host: HTMLElement
  private readonly particleField: THREE.Points

  constructor(host: HTMLElement, initialScene = 0) {
    this.host = host
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 680px)').matches
    this.renderer = new THREE.WebGLRenderer({ alpha: false, antialias: !mobile, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.35 : 1.8))
    this.renderer.setClearColor('#08090a', 1)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.domElement.className = 'scene-canvas'
    this.canvas = this.renderer.domElement
    this.host.appendChild(this.canvas)
    this.scene.background = new THREE.Color('#08090a')
    this.camera.position.set(0, 0, 9.6)

    this.scene.add(new THREE.HemisphereLight('#d7e5cb', '#111315', 1.2))
    const keyLight = new THREE.PointLight('#c8ff4d', 32, 16, 2)
    keyLight.position.set(1, 3, 5)
    this.scene.add(keyLight)
    const fillLight = new THREE.PointLight('#f5f5f5', 16, 18, 2)
    fillLight.position.set(-4, -2, 3)
    this.scene.add(fillLight)

    const count = mobile ? 150 : 330
    const positions = new Float32Array(count * 3)
    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 25
      positions[index * 3 + 1] = (Math.random() - 0.5) * 14
      positions[index * 3 + 2] = (Math.random() - 0.5) * 14 - 2
    }
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    this.particleField = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: '#a9b398', size: mobile ? 0.018 : 0.023, transparent: true, opacity: 0.6, sizeAttenuation: true }))
    this.scene.add(this.particleField)

    this.groups = [buildHome(this.scene), buildCommunity(this.scene), buildEvents(this.scene), buildActivities(this.scene), buildJoin(this.scene)]
    this.active = Math.max(0, Math.min(this.groups.length - 1, initialScene))
    this.cameraBaseX = CAMERA_STOPS[this.active]
    this.camera.position.x = this.cameraBaseX
    this.groups[this.active].visible = true
    this.groups[this.active].scale.setScalar(1)
    this.resize()
    window.addEventListener('resize', this.resize)
    if (this.reduceMotion) this.render()
    else this.renderer.setAnimationLoop(this.render)
  }

  private resize = () => {
    if (this.disposed) return
    const width = this.host.clientWidth
    const height = this.host.clientHeight
    this.renderer.setSize(width, height, false)
    this.camera.aspect = width / Math.max(1, height)
    this.camera.updateProjectionMatrix()
  }

  private render = () => {
    if (this.disposed) return
    this.frame += 1
    if (!this.reduceMotion) {
      const time = this.frame * 0.006
      this.particleField.rotation.y += 0.00013
      this.particleField.rotation.x = Math.sin(time * 0.2) * 0.008
      this.groups.forEach((group, index) => {
        group.rotation.y += 0.00065 + index * 0.00008
        group.position.y = Math.sin(time + index * 0.7) * 0.04
        group.animatedObjects.forEach((object, objectIndex) => {
          object.rotation.y += (objectIndex % 2 ? 1 : -1) * 0.0014
        })
      })
      this.camera.position.y += (this.pointer.y * 0.22 - this.camera.position.y) * 0.025
      this.camera.position.x += (this.cameraBaseX + this.pointer.x * 0.2 - this.camera.position.x) * 0.025
    }
    this.camera.lookAt(this.camera.position.x, 0, 0)
    this.renderer.render(this.scene, this.camera)
  }

  setPointer = (x: number, y: number) => {
    if (!this.reduceMotion) this.pointer.set(x, y)
  }

  setTheme = (lightMode: boolean) => {
    const background = lightMode ? '#dfe1d7' : '#08090a'
    this.scene.background = new THREE.Color(background)
    this.renderer.setClearColor(background, 1)
    const palette: Record<string, string> = lightMode
      ? { f5f5f5: '#242820', '898989': '#676b61', c8ff4d: '#719c21', a9b398: '#626958' }
      : { f5f5f5: '#f5f5f5', '898989': '#898989', c8ff4d: '#c8ff4d', a9b398: '#a9b398' }
    this.scene.traverse(object => {
      if (!('material' in object) || !object.material) return
      const materials = Array.isArray(object.material) ? object.material : [object.material]
      materials.forEach(material => {
        const colorMaterial = material as THREE.Material & { color?: THREE.Color }
        if (!colorMaterial.color) return
        const source = colorMaterial.userData.themeColor ?? colorMaterial.color.getHexString()
        colorMaterial.userData.themeColor = source
        const next = palette[source]
        if (next) colorMaterial.color.set(next)
      })
    })
  }

  transitionTo = (index: number, onComplete?: () => void) => {
    const next = Math.max(0, Math.min(this.groups.length - 1, index))
    if (next === this.active) {
      onComplete?.()
      return
    }
    const previous = this.groups[this.active]
    const target = this.groups[next]
    this.active = next
    target.visible = true
    target.scale.setScalar(0.82)
    target.traverse(child => {
      if (!('material' in child) || !child.material) return
      const materials = Array.isArray(child.material) ? child.material : [child.material]
      materials.forEach(material => {
        material.userData.sceneOpacity = (material as MaterialLike).opacity
        ;(material as MaterialLike).opacity = 0
      })
    })

    this.transitionTimeline?.kill()
    const timeline = gsap.timeline({ onComplete: () => {
      previous.visible = false
      if (this.reduceMotion) this.render()
      onComplete?.()
    } })
    this.transitionTimeline = timeline
    timeline.to(previous.position, { x: previous.position.x - 0.7, duration: this.reduceMotion ? 0 : 0.45, ease: 'power2.in' }, 0)
      .to(previous.scale, { x: 0.78, y: 0.78, z: 0.78, duration: this.reduceMotion ? 0 : 0.45, ease: 'power2.in' }, 0)
      .to(this, { cameraBaseX: CAMERA_STOPS[next], duration: this.reduceMotion ? 0 : 0.82, ease: 'power3.inOut' }, 0)
      .to(target.position, { x: CAMERA_STOPS[next], y: 0, duration: this.reduceMotion ? 0 : 0.82, ease: 'power3.out' }, 0.08)
      .to(target.scale, { x: 1, y: 1, z: 1, duration: this.reduceMotion ? 0 : 0.82, ease: 'back.out(1.25)' }, 0.08)
      .to(this.camera.position, { z: next === 0 ? 9.6 : 8.9, duration: this.reduceMotion ? 0 : 0.8, ease: 'power2.inOut' }, 0)
      .call(() => {
        target.traverse(child => {
          if (!('material' in child) || !child.material) return
          const materials = Array.isArray(child.material) ? child.material : [child.material]
          materials.forEach(material => timeline.to(material as MaterialLike, { opacity: Number(material.userData.sceneOpacity ?? 0.88), duration: this.reduceMotion ? 0 : 0.48, ease: 'power1.out' }, 0.2))
        })
      }, [], 0)
  }

  dispose = () => {
    this.disposed = true
    this.transitionTimeline?.kill()
    this.renderer.setAnimationLoop(null)
    window.removeEventListener('resize', this.resize)
    this.scene.traverse(object => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line) {
        object.geometry.dispose()
        const materials = Array.isArray(object.material) ? object.material : [object.material]
        materials.forEach(material => material.dispose())
      }
    })
    this.renderer.dispose()
    this.canvas.remove()
  }
}
