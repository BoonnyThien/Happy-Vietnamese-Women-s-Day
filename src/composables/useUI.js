// src/composables/useUI.js
import { ref } from 'vue'
import gsap from 'gsap'

export function useUI() {
  const currentGreeting = ref(0)
  const greetings = ref([
    "Chúc mừng 20/10! Chúc bạn luôn xinh đẹp, hạnh phúc và thành công trong cuộc sống! ❤️",
    "",
    ""
  ])

  const changeGreeting = () => {
    currentGreeting.value = (currentGreeting.value + 1) % greetings.value.length
  }

  const swapItems = (models) => {  // models = [moonRef, cupRef, ...]
    gsap.to(models, {
      x: () => Math.random() * 6 - 3,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    })
  }

  // GSAP Intro
  const initAnimations = (models) => {
    gsap.fromTo(models, 
      { y: -5, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'bounce.out' }
    )
  }

  return { currentGreeting, greetings, changeGreeting, swapItems, initAnimations }
}