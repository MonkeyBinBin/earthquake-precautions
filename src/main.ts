import './style.css'

class EarthquakePreventionApp {
  constructor() {
    this.initApp()
  }

  private async initApp(): Promise<void> {
    await this.hideLoadingIndicator()
    this.showApp()
    this.setupNavigation()
    this.setupMobileMenu()
    this.setupScrollNavigation()
    this.setupGoToTop()
    this.setupEventListeners()
  }

  private async hideLoadingIndicator(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        const loadingIndicator = document.getElementById('loading-indicator')
        if (loadingIndicator) {
          loadingIndicator.style.transition = 'opacity 0.4s ease-out'
          loadingIndicator.style.opacity = '0'
          setTimeout(() => {
            loadingIndicator.style.display = 'none'
            resolve()
          }, 400)
        } else {
          resolve()
        }
      }, 500)
    })
  }

  private showApp(): void {
    const app = document.getElementById('app')
    if (app) {
      app.classList.remove('hidden')
      app.style.transition = 'opacity 0.5s ease-out'
      app.style.opacity = '1'
    }
  }

  private setupNavigation(): void {
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile')
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault()
        const section = (e.target as HTMLElement).getAttribute('data-section')
        if (section) {
          this.navigateToSection(section)
        }
      })
    })

    const featureButtons = document.querySelectorAll('[data-section]')
    featureButtons.forEach(button => {
      button.addEventListener('click', e => {
        const section = (e.target as HTMLElement).getAttribute('data-section')
        if (section) {
          this.navigateToSection(section)
        }
      })
    })
  }

  private setupMobileMenu(): void {
    const mobileMenuButton = document.getElementById('mobile-menu-button')
    const mobileMenu = document.getElementById('mobile-menu')

    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true'
        mobileMenuButton.setAttribute('aria-expanded', (!isExpanded).toString())

        if (isExpanded) {
          mobileMenu.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out'
          mobileMenu.style.opacity = '0'
          mobileMenu.style.transform = 'translateY(-10px)'
          setTimeout(() => {
            mobileMenu.classList.add('hidden')
            mobileMenu.style.cssText = ''
          }, 300)
        } else {
          mobileMenu.style.opacity = '0'
          mobileMenu.style.transform = 'translateY(-10px)'
          mobileMenu.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out'
          mobileMenu.classList.remove('hidden')
          mobileMenu.style.opacity = '1'
          mobileMenu.style.transform = 'translateY(0)'
        }
      })
    }
  }

  private navigateToSection(section: string): void {
    const targetSection = document.getElementById(`${section}-section`)
    if (!targetSection) return

    // 更新導航鏈接狀態
    document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => {
      link.classList.remove('active')
    })

    document.querySelectorAll(`[data-section="${section}"]`).forEach(link => {
      if (link.classList.contains('nav-link') || link.classList.contains('nav-link-mobile')) {
        link.classList.add('active')
      }
    })

    // 平滑滾動到目標區域
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    // 關閉行動版選單
    const mobileMenu = document.getElementById('mobile-menu')
    if (mobileMenu) {
      mobileMenu.classList.add('hidden')
      const mobileMenuButton = document.getElementById('mobile-menu-button')
      if (mobileMenuButton) {
        mobileMenuButton.setAttribute('aria-expanded', 'false')
      }
    }
  }

  private setupScrollNavigation(): void {
    // 設定滾動監聽器來更新導航狀態
    let ticking = false

    const updateNavigation = () => {
      const sections = document.querySelectorAll('.section')
      const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile')

      let currentSection = ''

      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        const sectionHeight = rect.height
        const scrollPosition = window.scrollY + window.innerHeight / 3

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = section.id.replace('-section', '')
        }
      })

      // 更新導航狀態
      navLinks.forEach(link => {
        link.classList.remove('active')
        const linkSection = link.getAttribute('data-section')
        if (linkSection === currentSection) {
          link.classList.add('active')
        }
      })

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavigation)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    // 初始狀態
    updateNavigation()
  }

  private setupGoToTop(): void {
    const goToTopButton = document.getElementById('go-to-top')
    if (!goToTopButton) return

    let ticking = false

    const updateGoToTopVisibility = () => {
      const scrollY = window.scrollY

      if (scrollY > 300) {
        goToTopButton.classList.remove('opacity-0', 'invisible')
        goToTopButton.classList.add('opacity-100', 'visible')
      } else {
        goToTopButton.classList.add('opacity-0', 'invisible')
        goToTopButton.classList.remove('opacity-100', 'visible')
      }

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateGoToTopVisibility)
        ticking = true
      }
    }

    // 滾動監聽
    window.addEventListener('scroll', onScroll, { passive: true })

    // 點擊事件
    goToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    })

    // 初始狀態
    updateGoToTopVisibility()
  }

  private setupEventListeners(): void {
    this.setupSituationNavigation()
    this.setupMistakeNavigation()
  }

  private setupSituationNavigation(): void {
    const navButtons = document.querySelectorAll('.situation-nav-btn')
    const categories = document.querySelectorAll('.situation-category')

    navButtons.forEach(button => {
      button.addEventListener('click', e => {
        const target = e.target as HTMLElement
        const category = target.getAttribute('data-category')

        if (!category) return

        // 更新按鈕狀態
        navButtons.forEach(btn => btn.classList.remove('active'))
        target.classList.add('active')

        // 切換情境分類
        categories.forEach(cat => {
          if (cat.id === `${category}-situations`) {
            // 立即顯示目標分類
            cat.classList.add('active')
          } else {
            // 隱藏其他分類
            cat.classList.remove('active')
          }
        })
      })
    })
  }

  private setupMistakeNavigation(): void {
    const navButtons = document.querySelectorAll('.mistake-nav-btn')
    const categories = document.querySelectorAll('.mistake-category')

    navButtons.forEach(button => {
      button.addEventListener('click', e => {
        const target = e.target as HTMLElement
        const category = target.getAttribute('data-category')

        if (!category) return

        // 更新按鈕狀態
        navButtons.forEach(btn => btn.classList.remove('active'))
        target.classList.add('active')

        // 切換錯誤行為分類
        categories.forEach(cat => {
          if (cat.id === `${category}-mistakes`) {
            // 立即顯示目標分類
            cat.classList.add('active')
          } else {
            // 隱藏其他分類
            cat.classList.remove('active')
          }
        })
      })
    })
  }
}

// 初始化應用程式
new EarthquakePreventionApp()
