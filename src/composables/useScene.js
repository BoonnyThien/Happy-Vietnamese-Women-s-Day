import { ref } from 'vue'

export function useScene(){
  const scene = ref(null)
  const camera = ref(null)
  const renderer = ref(null)

  function refresh(){
    if (window.App){
      scene.value = window.App.getScene && window.App.getScene()
      camera.value = window.App.getCamera && window.App.getCamera()
      renderer.value = window.App.getRenderer && window.App.getRenderer()
    }
  }

  // call initially
  refresh()

  return { scene, camera, renderer, refresh }
}