import './style.css'

interface EmergencyContact {
  name: string
  phone: string
  relationship: string
}

interface PreparationItem {
  id: string
  name: string
  category: string
  checked: boolean
  description: string
}

class EarthquakePreventionApp {
  private preparationItems: PreparationItem[] = []
  private emergencyContacts: EmergencyContact[] = []

  constructor() {
    this.initApp()
  }

  private async initApp(): Promise<void> {
    await this.hideLoadingIndicator()
    this.showApp()
    this.setupNavigation()
    this.setupMobileMenu()
    this.initializePreparationItems()
    this.loadUserData()
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
    const currentSections = document.querySelectorAll('.section.active')
    const targetSection = document.getElementById(`${section}-section`)

    if (!targetSection) return

    // 淡出當前頁面
    currentSections.forEach(sec => {
      const sectionEl = sec as HTMLElement
      sectionEl.style.transition = 'opacity 0.3s ease-in-out'
      sectionEl.style.opacity = '0'

      setTimeout(() => {
        sectionEl.classList.add('hidden')
        sectionEl.classList.remove('active')
        sectionEl.style.cssText = ''
      }, 300)
    })

    // 準備新頁面
    targetSection.style.opacity = '0'
    targetSection.style.transition = 'opacity 0.4s ease-in-out'
    targetSection.classList.remove('hidden')

    // 淡入新頁面
    setTimeout(() => {
      targetSection.classList.add('active')
      targetSection.style.opacity = '1'

      // 內容元素輕微淡入效果
      const contentElements = targetSection.querySelectorAll('.bg-white, .border')
      contentElements.forEach((element, index) => {
        const el = element as HTMLElement
        el.style.opacity = '0'
        el.style.transition = 'opacity 0.2s ease-out'

        setTimeout(() => {
          el.style.opacity = '1'
        }, 100 + index * 30)
      })
    }, 150)

    document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => {
      link.classList.remove('active')
    })

    document.querySelectorAll(`[data-section="${section}"]`).forEach(link => {
      if (link.classList.contains('nav-link') || link.classList.contains('nav-link-mobile')) {
        link.classList.add('active')
      }
    })

    this.loadSectionContent(section)

    const mobileMenu = document.getElementById('mobile-menu')
    if (mobileMenu) {
      mobileMenu.classList.add('hidden')
      const mobileMenuButton = document.getElementById('mobile-menu-button')
      if (mobileMenuButton) {
        mobileMenuButton.setAttribute('aria-expanded', 'false')
      }
    }
  }

  private loadSectionContent(section: string): void {
    switch (section) {
      case 'three-steps':
        this.loadThreeStepsContent()
        break
      case 'situations':
        this.loadSituationsContent()
        break
      case 'mistakes':
        this.loadMistakesContent()
        break
      case 'knowledge':
        this.loadKnowledgeContent()
        break
      case 'guidance':
        this.loadGuidanceContent()
        break
      case 'preparation':
        this.loadPreparationContent()
        break
      case 'emergency':
        this.loadEmergencyContent()
        break
    }
  }

  private loadThreeStepsContent(): void {
    const content = document.getElementById('three-steps-content')
    if (!content) return

    content.innerHTML = `
      <div class="space-y-12">
        <!-- 主要三步驟介紹 -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <div class="text-center mb-12">
            <h3 class="text-4xl font-bold text-gray-800 mb-6">趴下、掩護、穩住</h3>
            <p class="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              地震發生時最重要的自我保護動作，請跟著可愛的角色學習正確的避難步驟
            </p>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <!-- 步驟 1: 趴下 -->
            <div class="text-center group transform hover:scale-105 transition-transform duration-300">
              <div class="relative mb-8">
                <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src="/action-drop.png" 
                    alt="趴下動作示意圖" 
                    class="w-full h-48 object-contain mx-auto rounded-2xl"
                    loading="lazy"
                  />
                </div>
                <div class="absolute -top-3 -right-3 bg-red-600 text-white text-lg font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg animate-bounce">
                  1
                </div>
              </div>
              <h4 class="text-3xl font-bold mb-4 text-red-600">趴下</h4>
              <div class="bg-red-50 rounded-xl p-6 space-y-4">
                <p class="text-lg font-semibold text-red-800">立即蹲下保護自己</p>
                <ul class="text-gray-700 space-y-3 text-left">
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></span>
                    不要站著，立即蹲下
                  </li>
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></span>
                    用手和膝蓋支撐身體
                  </li>
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></span>
                    降低身體重心避免跌倒
                  </li>
                </ul>
              </div>
            </div>
            
            <!-- 步驟 2: 掩護 -->
            <div class="text-center group transform hover:scale-105 transition-transform duration-300">
              <div class="relative mb-8">
                <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src="/action-cover.png" 
                    alt="掩護動作示意圖" 
                    class="w-full h-48 object-contain mx-auto rounded-2xl"
                    loading="lazy"
                  />
                </div>
                <div class="absolute -top-3 -right-3 bg-orange-600 text-white text-lg font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg animate-bounce" style="animation-delay: 0.2s;">
                  2
                </div>
              </div>
              <h4 class="text-3xl font-bold mb-4 text-orange-600">掩護</h4>
              <div class="bg-orange-50 rounded-xl p-6 space-y-4">
                <p class="text-lg font-semibold text-orange-800">躲到桌下或保護頭頸部</p>
                <ul class="text-gray-700 space-y-3 text-left">
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></span>
                    躲在堅固桌子下方
                  </li>
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></span>
                    用手臂保護頭部和頸部
                  </li>
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></span>
                    遠離可能掉落的物品
                  </li>
                </ul>
              </div>
            </div>
            
            <!-- 步驟 3: 穩住 -->
            <div class="text-center group transform hover:scale-105 transition-transform duration-300">
              <div class="relative mb-8">
                <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src="/action-hold-on.png" 
                    alt="穩住動作示意圖" 
                    class="w-full h-48 object-contain mx-auto rounded-2xl"
                    loading="lazy"
                  />
                </div>
                <div class="absolute -top-3 -right-3 bg-green-600 text-white text-lg font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg animate-bounce" style="animation-delay: 0.4s;">
                  3
                </div>
              </div>
              <h4 class="text-3xl font-bold mb-4 text-green-600">穩住</h4>
              <div class="bg-green-50 rounded-xl p-6 space-y-4">
                <p class="text-lg font-semibold text-green-800">緊握並保持保護姿勢</p>
                <ul class="text-gray-700 space-y-3 text-left">
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                    緊握桌腳或護身物
                  </li>
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                    保持掩護姿勢不動
                  </li>
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                    隨護身物一起移動
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 記憶口訣區塊 -->
          <div class="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h4 class="text-2xl font-bold mb-4">記憶口訣</h4>
            <div class="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 text-xl font-bold">
              <span class="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg">趴下</span>
              <span class="text-2xl text-white">→</span>
              <span class="bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg">掩護</span>
              <span class="text-2xl text-white">→</span>
              <span class="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg">穩住</span>
            </div>
            <p class="mt-6 text-blue-100">重複練習這三個步驟，讓它成為本能反應</p>
          </div>
        </div>
        
        <!-- 重要提醒 -->
        <div class="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-6 rounded-lg">
          <div class="flex items-start">
            <svg class="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <div>
              <h4 class="text-lg font-bold text-blue-800 mb-2">重要提醒</h4>
              <ul class="space-y-2 text-blue-700">
                <li>• 練習時要反覆練習，直到成為本能反應</li>
                <li>• 地震時不要立刻跑向出口，先做好三步驟</li>
                <li>• 搖震停止後才離開，小心餘震</li>
                <li>• 如果沒有桌子，用手臂保護頭部也很重要</li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- 互動練習區 -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">互動練習</h3>
          <div class="text-center mb-6">
            <p class="text-gray-600 mb-4">點擊下方按鈕，開始模擬練習地震避難三步驟</p>
            <button id="practice-btn" class="bg-blue-600 text-white text-lg font-bold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors">
              開始練習
            </button>
          </div>
          
          <div id="practice-steps" class="hidden space-y-6">
            <div class="bg-gray-100 p-6 rounded-lg">
              <div class="text-center">
                <div id="current-step" class="text-4xl font-bold mb-4"></div>
                <div id="step-instruction" class="text-xl text-gray-700 mb-4"></div>
                <div class="text-gray-500">
                  <span id="step-counter"></span>
                  <div class="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div id="progress-bar-practice" class="bg-blue-600 h-2 rounded-full transition-all duration-1000" style="width: 0%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    
    this.setupThreeStepsEventListeners()
  }

  private loadSituationsContent(): void {
    const content = document.getElementById('situations-content')
    if (!content) return

    content.innerHTML = `
      <div class="space-y-8">
        <!-- 室內避難 -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <div class="flex items-center mb-8">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </div>
            <h3 class="text-3xl font-bold text-blue-600">室內場所避難指導</h3>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- 辦公室 -->
            <div class="group">
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
                <div class="text-center mb-6">
                  <div class="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center mb-4">
                    <!-- 圖片區塊 - 辦公室避難 -->
                    <!-- 建議尺寸：600x400px -->
                    <span class="text-gray-500 text-sm">辦公室避難圖片<br/>建議尺寸：600x400px</span>
                  </div>
                  <h4 class="text-xl font-bold text-blue-700 mb-2">辦公室</h4>
                  <p class="text-blue-600 font-medium mb-4">躲在堅固辦公桌下</p>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">躲在堅固的辦公桌下</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">遠離書櫃等高大家具</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">用手保護頭部</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 家中 -->
            <div class="group">
              <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border-2 border-emerald-200 hover:shadow-xl transition-all duration-300">
                <div class="text-center mb-6">
                  <div class="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center mb-4">
                    <!-- 圖片區塊 - 家中避難 -->
                    <!-- 建議尺寸：600x400px -->
                    <span class="text-gray-500 text-sm">家中避難圖片<br/>建議尺寸：600x400px</span>
                  </div>
                  <h4 class="text-xl font-bold text-emerald-700 mb-2">家中</h4>
                  <p class="text-emerald-600 font-medium mb-4">躲在餐桌或書桌下</p>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">尋找堅固的桌子躲身</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">遠離窗戶和鏡子</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">避開易碎物品</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 學校 -->
            <div class="group">
              <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200 hover:shadow-xl transition-all duration-300">
                <div class="text-center mb-6">
                  <div class="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center mb-4">
                    <!-- 圖片區塊 - 學校避難 -->
                    <!-- 建議尺寸：600x400px -->
                    <span class="text-gray-500 text-sm">學校避難圖片<br/>建議尺寸：600x400px</span>
                  </div>
                  <h4 class="text-xl font-bold text-purple-700 mb-2">學校</h4>
                  <p class="text-purple-600 font-medium mb-4">躲在課桌下</p>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">聽從老師指示</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">躲在課桌下保護頭部</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">不要急於跑向出口</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 公共場所 -->
            <div class="group">
              <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200 hover:shadow-xl transition-all duration-300">
                <div class="text-center mb-6">
                  <div class="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center mb-4">
                    <!-- 圖片區塊 - 公共場所避難 -->
                    <!-- 建議尺寸：600x400px -->
                    <span class="text-gray-500 text-sm">公共場所避難圖片<br/>建議尺寸：600x400px</span>
                  </div>
                  <h4 class="text-xl font-bold text-orange-700 mb-2">公共場所</h4>
                  <p class="text-orange-600 font-medium mb-4">尋找堅固桌子或用手保護頭部</p>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">尋找堅固的掩護物</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">遠離大型玻璃窗</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">保持冷靜，不要擁擠</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 床上 -->
            <div class="group">
              <div class="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 border-2 border-pink-200 hover:shadow-xl transition-all duration-300">
                <div class="text-center mb-6">
                  <div class="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center mb-4">
                    <!-- 圖片區塊 - 床上避難 -->
                    <!-- 建議尺寸：600x400px -->
                    <span class="text-gray-500 text-sm">床上避難圖片<br/>建議尺寸：600x400px</span>
                  </div>
                  <h4 class="text-xl font-bold text-pink-700 mb-2">床上</h4>
                  <p class="text-pink-600 font-medium mb-4">用枕頭保護頭部，趴在床上</p>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">用枕頭保護頭部和頸部</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">趴在床上直到地震停止</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">不要起身或下床</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 電梯內 -->
            <div class="group">
              <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border-2 border-yellow-200 hover:shadow-xl transition-all duration-300">
                <div class="text-center mb-6">
                  <div class="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center mb-4">
                    <!-- 圖片區塊 - 電梯避難 -->
                    <!-- 建議尺寸：600x400px -->
                    <span class="text-gray-500 text-sm">電梯避難圖片<br/>建議尺寸：600x400px</span>
                  </div>
                  <h4 class="text-xl font-bold text-yellow-700 mb-2">電梯內</h4>
                  <p class="text-yellow-600 font-medium mb-4">按下所有樓層按鈕，最快到達就離開</p>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">按下所有樓層按鈕</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">最快到達的樓層就離開</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">如受困使用緊急按鈕求救</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">不要強行打開電梯門</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 戶外避難 -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <div class="flex items-center mb-8">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>
              </svg>
            </div>
            <h3 class="text-3xl font-bold text-green-600">戶外場所避難指導</h3>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- 街道上 -->
            <div class="group">
              <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200 hover:shadow-xl transition-all duration-300">
                <div class="text-center mb-6">
                  <div class="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center mb-4">
                    <!-- 圖片區塊 - 街道避難 -->
                    <!-- 建議尺寸：600x400px -->
                    <span class="text-gray-500 text-sm">街道避難圖片<br/>建議尺寸：600x400px</span>
                  </div>
                  <h4 class="text-xl font-bold text-green-700 mb-2">街道上</h4>
                  <p class="text-green-600 font-medium mb-4">遠離建築物、電線桿</p>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">快速移動到空曠地帶</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">避開招牌、玻璃</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">蹲下並保護頭部</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 空曠地帶 -->
            <div class="group">
              <div class="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border-2 border-teal-200 hover:shadow-xl transition-all duration-300">
                <div class="text-center mb-6">
                  <div class="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center mb-4">
                    <!-- 圖片區塊 - 空曠地帶避難 -->
                    <!-- 建議尺寸：600x400px -->
                    <span class="text-gray-500 text-sm">空曠地帶避難圖片<br/>建議尺寸：600x400px</span>
                  </div>
                  <h4 class="text-xl font-bold text-teal-700 mb-2">空曠地帶</h4>
                  <p class="text-teal-600 font-medium mb-4">就地避難</p>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">遠離可能倒塌的物體</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">蹲下保護頭部</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">注意地面裂縫</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 海邊山區 -->
            <div class="group">
              <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200 hover:shadow-xl transition-all duration-300">
                <div class="text-center mb-6">
                  <div class="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center mb-4">
                    <!-- 圖片區塊 - 海邊山區避難 -->
                    <!-- 建議尺寸：600x400px -->
                    <span class="text-gray-500 text-sm">海邊山區避難圖片<br/>建議尺寸：600x400px</span>
                  </div>
                  <h4 class="text-xl font-bold text-red-700 mb-2">海邊山區</h4>
                  <p class="text-red-600 font-medium mb-4">特殊警戒區域</p>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">海邊：快速撤離到高地</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">山區：警覺落石山崩</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">遠離危險地形</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 交通工具內避難 -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <div class="flex items-center mb-8">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
              </svg>
            </div>
            <h3 class="text-3xl font-bold text-purple-600">交通工具內避難指導</h3>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- 車內避難 -->
            <div class="group">
              <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200 hover:shadow-xl transition-all duration-300">
                <div class="text-center mb-6">
                  <div class="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center mb-4">
                    <!-- 圖片區塊 - 車內避難 -->
                    <!-- 建議尺寸：600x400px -->
                    <span class="text-gray-500 text-sm">車內避難圖片<br/>建議尺寸：600x400px</span>
                  </div>
                  <h4 class="text-xl font-bold text-purple-700 mb-2">車內避難</h4>
                  <p class="text-purple-600 font-medium mb-4">停車並保持坐姿，用手保護頭部</p>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">緩慢停車到安全位置</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">拉起手煞車</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">留在車內保護頭部</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">等震動停止再下車</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 大眾運輸 -->
            <div class="group">
              <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 border-2 border-indigo-200 hover:shadow-xl transition-all duration-300">
                <div class="text-center mb-6">
                  <div class="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center mb-4">
                    <!-- 圖片區塊 - 大眾運輸避難 -->
                    <!-- 建議尺寸：600x400px -->
                    <span class="text-gray-500 text-sm">大眾運輸避難圖片<br/>建議尺寸：600x400px</span>
                  </div>
                  <h4 class="text-xl font-bold text-indigo-700 mb-2">大眾運輸</h4>
                  <p class="text-indigo-600 font-medium mb-4">緊握把手或座椅</p>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">抓緊座椅或扶手</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">降低重心蹲下</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">保護頭頸部</span>
                  </div>
                  <div class="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <span class="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                    <span class="text-sm text-gray-700">聽從駕駛員指示</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  private loadMistakesContent(): void {
    const content = document.getElementById('mistakes-content')
    if (!content) return

    content.innerHTML = `
      <div class="max-w-6xl mx-auto">
        <!-- 頁面標題區域 -->
        <div class="text-center mb-12 animate-fade-in">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl mb-6 shadow-lg">
            <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L1 21h22L12 2zm0 3.8L5.5 18h13L12 5.8z"/>
            </svg>
          </div>
          <h2 class="text-4xl font-bold text-gray-800 mb-4">危險行為警示</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            避免這些錯誤行為，保護自己和他人的安全
          </p>
          <div class="w-24 h-1 bg-gradient-to-r from-red-500 to-rose-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <!-- 危險行為卡片網格 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div class="mistake-card animate-slide-in-left card-stagger-1">
            <div class="mistake-card-inner">
              <div class="mistake-icon-container">
                <div class="mistake-icon bg-gradient-to-br from-red-500 to-red-600">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 2h-2l-.6 9h3.2L13 2zM12 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </div>
              </div>
              <div class="mistake-content">
                <h3 class="mistake-title">不要跑向出口</h3>
                <p class="mistake-description">地震時急於逃跑容易跌倒受傷，被掉落物擊中</p>
                <div class="mistake-danger-level">
                  <span class="danger-indicator high">高危險</span>
                </div>
              </div>
            </div>
          </div>

          <div class="mistake-card animate-slide-in-left card-stagger-2">
            <div class="mistake-card-inner">
              <div class="mistake-icon-container">
                <div class="mistake-icon bg-gradient-to-br from-red-500 to-red-600">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                </div>
              </div>
              <div class="mistake-content">
                <h3 class="mistake-title">不要躲在門框下</h3>
                <p class="mistake-description">現代建築門框構造已不如過去堅固，無法提供有效保護</p>
                <div class="mistake-danger-level">
                  <span class="danger-indicator medium">中危險</span>
                </div>
              </div>
            </div>
          </div>

          <div class="mistake-card animate-slide-in-left card-stagger-3">
            <div class="mistake-card-inner">
              <div class="mistake-icon-container">
                <div class="mistake-icon bg-gradient-to-br from-red-500 to-red-600">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
              </div>
              <div class="mistake-content">
                <h3 class="mistake-title">不要使用電梯</h3>
                <p class="mistake-description">地震時電梯可能停電或故障，很容易受困</p>
                <div class="mistake-danger-level">
                  <span class="danger-indicator high">高危險</span>
                </div>
              </div>
            </div>
          </div>

          <div class="mistake-card animate-slide-in-left card-stagger-4">
            <div class="mistake-card-inner">
              <div class="mistake-icon-container">
                <div class="mistake-icon bg-gradient-to-br from-red-500 to-red-600">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 7h-2v4L9 13v2l2-2 2-2h4l-2-2-2-2z"/>
                  </svg>
                </div>
              </div>
              <div class="mistake-content">
                <h3 class="mistake-title">不要站在窗戶旁邊</h3>
                <p class="mistake-description">窗戶玻璃可能破裂，造成嚴重割傷</p>
                <div class="mistake-danger-level">
                  <span class="danger-indicator high">高危險</span>
                </div>
              </div>
            </div>
          </div>

          <div class="mistake-card animate-slide-in-left card-stagger-5">
            <div class="mistake-card-inner">
              <div class="mistake-icon-container">
                <div class="mistake-icon bg-gradient-to-br from-red-500 to-red-600">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                </div>
              </div>
              <div class="mistake-content">
                <h3 class="mistake-title">不要躲在高大家具旁</h3>
                <p class="mistake-description">書櫃、衣櫃等可能倒塌，造成擠壓傷害</p>
                <div class="mistake-danger-level">
                  <span class="danger-indicator high">高危險</span>
                </div>
              </div>
            </div>
          </div>

          <div class="mistake-card animate-slide-in-left card-stagger-6">
            <div class="mistake-card-inner">
              <div class="mistake-icon-container">
                <div class="mistake-icon bg-gradient-to-br from-red-500 to-red-600">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.5 2C13.3 2 14 2.7 14 3.5v5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5v-5c0-.8.7-1.5 1.5-1.5z"/>
                  </svg>
                </div>
              </div>
              <div class="mistake-content">
                <h3 class="mistake-title">不要點火或點煙</h3>
                <p class="mistake-description">地震後可能有瓦斯外洩，明火會引起爆炸</p>
                <div class="mistake-danger-level">
                  <span class="danger-indicator extreme">極危險</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 特殊情況警示區域 -->
        <div class="special-situations-warning animate-slide-up">
          <div class="warning-header">
            <div class="warning-icon-large">
              <svg class="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-amber-800 mb-2">特殊情況注意事項</h3>
            <p class="text-amber-700">根據所在位置採取適當的避難措施</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="situation-card animate-fade-in card-stagger-1">
              <div class="situation-icon">
                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
                </svg>
              </div>
              <div>
                <h4 class="situation-title">在車內時</h4>
                <p class="situation-description">停車並留在車內，用手保護頭部，不要下車</p>
              </div>
            </div>

            <div class="situation-card animate-fade-in card-stagger-2">
              <div class="situation-icon">
                <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H9v-7H1v7h6v2l4 4 4-4v-2h6V7z"/>
                </svg>
              </div>
              <div>
                <h4 class="situation-title">在床上時</h4>
                <p class="situation-description">用枕頭保護頭部，保持趴臥姿勢直到地震停止</p>
              </div>
            </div>

            <div class="situation-card animate-fade-in card-stagger-3">
              <div class="situation-icon">
                <svg class="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 4c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h6l4 4 4-4h2c1.1 0 2-.9 2-2V4z"/>
                </svg>
              </div>
              <div>
                <h4 class="situation-title">在海邊時</h4>
                <p class="situation-description">地震後立即前往高地，預防可能發生的海嘯</p>
              </div>
            </div>

            <div class="situation-card animate-fade-in card-stagger-4">
              <div class="situation-icon">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22l-9-12z"/>
                </svg>
              </div>
              <div>
                <h4 class="situation-title">在山區時</h4>
                <p class="situation-description">警覺落石和山崩風險，盡快遠離懸崖邊坡</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  private loadKnowledgeContent(): void {
    const content = document.getElementById('knowledge-content')
    if (!content) return

    content.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="text-center mb-4">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">地震成因</h3>
          </div>
          <p class="text-gray-600 mb-4">地震是由板塊運動造成的自然現象，了解地震成因有助於提高防災意識。</p>
          <ul class="text-sm text-gray-600 space-y-2">
            <li>• 板塊邊界活動</li>
            <li>• 斷層錯動</li>
            <li>• 地殼應力釋放</li>
          </ul>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="text-center mb-4">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">震度分級</h3>
          </div>
          <p class="text-gray-600 mb-4">台灣採用0-7級震度分級系統，了解震度有助於判斷地震嚴重程度。</p>
          <div class="space-y-1 text-sm">
            <div class="flex justify-between"><span>0級：</span><span class="text-gray-600">無感</span></div>
            <div class="flex justify-between"><span>1級：</span><span class="text-gray-600">微震</span></div>
            <div class="flex justify-between"><span>2級：</span><span class="text-gray-600">輕震</span></div>
            <div class="flex justify-between"><span>3級：</span><span class="text-gray-600">弱震</span></div>
            <div class="flex justify-between"><span>4級：</span><span class="text-gray-600">中震</span></div>
            <div class="flex justify-between"><span>5級：</span><span class="text-gray-600">強震</span></div>
            <div class="flex justify-between"><span>6級：</span><span class="text-gray-600">烈震</span></div>
            <div class="flex justify-between"><span>7級：</span><span class="text-gray-600">劇震</span></div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="text-center mb-4">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">台灣地震帶</h3>
          </div>
          <p class="text-gray-600 mb-4">台灣位於環太平洋地震帶上，了解地震帶分布有助於防災準備。</p>
          <ul class="text-sm text-gray-600 space-y-2">
            <li>• 西部地震帶</li>
            <li>• 東部地震帶</li>
            <li>• 東北部地震帶</li>
            <li>• 西南部地震帶</li>
          </ul>
        </div>
      </div>
    `
  }

  private loadGuidanceContent(): void {
    const content = document.getElementById('guidance-content')
    if (!content) return

    content.innerHTML = `
      <div class="space-y-8">
        <!-- 趴下、掩護、穩住 -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h3 class="text-2xl font-semibold text-center mb-8">地震應變三步驟</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <h4 class="text-xl font-bold mb-3 text-red-600">趴下 (DROP)</h4>
              <p class="text-gray-600">立即蹲下，採取蹲姿或趴姿，降低身體重心</p>
            </div>
            
            <div class="text-center">
              <div class="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-10 h-10 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h4 class="text-xl font-bold mb-3 text-orange-600">掩護 (COVER)</h4>
              <p class="text-gray-600">躲到堅固桌子底下，或用手臂保護頭頸部</p>
            </div>
            
            <div class="text-center">
              <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <h4 class="text-xl font-bold mb-3 text-blue-600">穩住 (HOLD ON)</h4>
              <p class="text-gray-600">抓緊桌腳，保持掩護姿勢直到搖晃停止</p>
            </div>
          </div>
        </div>

        <!-- 不同場所應變指導 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-2xl font-semibold mb-6">不同場所應變指導</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h4 class="text-lg font-semibold text-blue-600">室內應變</h4>
              <div class="space-y-3">
                <div class="border-l-4 border-blue-400 pl-4">
                  <h5 class="font-medium">在家中</h5>
                  <p class="text-sm text-gray-600">躲到堅固桌子底下，遠離窗戶、鏡子等易碎物品</p>
                </div>
                <div class="border-l-4 border-blue-400 pl-4">
                  <h5 class="font-medium">在辦公室</h5>
                  <p class="text-sm text-gray-600">就近躲到辦公桌底下，避開書櫃等高大傢俱</p>
                </div>
                <div class="border-l-4 border-blue-400 pl-4">
                  <h5 class="font-medium">在學校</h5>
                  <p class="text-sm text-gray-600">聽從老師指示，躲到課桌底下保護頭部</p>
                </div>
                <div class="border-l-4 border-blue-400 pl-4">
                  <h5 class="font-medium">在床上</h5>
                  <p class="text-sm text-gray-600">用枕頭保護頭部，趴在床上直到地震停止，不要起身下床</p>
                </div>
              </div>
            </div>
            
            <div class="space-y-4">
              <h4 class="text-lg font-semibold text-green-600">戶外應變</h4>
              <div class="space-y-3">
                <div class="border-l-4 border-green-400 pl-4">
                  <h5 class="font-medium">在街道上</h5>
                  <p class="text-sm text-gray-600">遠離建築物、電線桿，就近尋找空曠地帶</p>
                </div>
                <div class="border-l-4 border-green-400 pl-4">
                  <h5 class="font-medium">在車內</h5>
                  <p class="text-sm text-gray-600">立即停車，避開橋梁、高架道路，留在車內</p>
                </div>
                <div class="border-l-4 border-green-400 pl-4">
                  <h5 class="font-medium">在電梯內</h5>
                  <p class="text-sm text-gray-600">按下所有樓層按鈕，最快到達的樓層就離開，如受困請使用緊急按鈕求救</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  private loadPreparationContent(): void {
    const content = document.getElementById('preparation-content')
    if (!content) return

    content.innerHTML = `
      <div class="space-y-8">
        <!-- 防災包檢查清單 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-semibold">防災包檢查清單</h3>
            <div class="flex space-x-2">
              <button id="check-all-btn" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                全選
              </button>
              <button id="uncheck-all-btn" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                全清
              </button>
            </div>
          </div>
          
          <div id="preparation-checklist" class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- 清單將由 JavaScript 動態生成 -->
          </div>
          
          <div class="mt-6 text-center">
            <div id="completion-status" class="text-lg font-semibold mb-4"></div>
            <div class="bg-gray-200 rounded-full h-4 overflow-hidden">
              <div id="progress-bar" class="bg-green-600 h-full transition-all duration-300" style="width: 0%"></div>
            </div>
          </div>
        </div>

        <!-- 緊急聯絡人管理 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-2xl font-semibold mb-6">緊急聯絡人管理</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" id="contact-name" class="border border-gray-300 rounded px-3 py-2" placeholder="姓名">
              <input type="tel" id="contact-phone" class="border border-gray-300 rounded px-3 py-2" placeholder="電話號碼">
              <input type="text" id="contact-relationship" class="border border-gray-300 rounded px-3 py-2" placeholder="關係">
            </div>
            <button id="add-contact-btn" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
              新增聯絡人
            </button>
          </div>
          
          <div id="emergency-contacts-list" class="mt-6 space-y-3">
            <!-- 聯絡人清單將由 JavaScript 動態生成 -->
          </div>
        </div>
      </div>
    `

    this.renderPreparationChecklist()
    this.renderEmergencyContacts()
    this.setupPreparationEventListeners()
  }

  private loadEmergencyContent(): void {
    const content = document.getElementById('emergency-content')
    if (!content) return

    content.innerHTML = `
      <div class="space-y-8">
        <!-- SOS 緊急按鈕 -->
        <div class="bg-red-50 border border-red-200 rounded-lg p-8 text-center animate-zoom-in">
          <h3 class="text-2xl font-bold text-red-800 mb-4 animate-bounce-in">緊急求救</h3>
          <button id="sos-btn" class="bg-red-600 text-white text-xl font-bold px-8 py-4 rounded-full hover:bg-red-700 transition-colors emergency-pulse hover-grow">
            🆘 SOS 求救
          </button>
          <p class="text-red-700 mt-4 animate-fade-in-up">點擊此按鈕將自動撥打119並傳送位置資訊</p>
        </div>

        <!-- 地震發生時緊急應變 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-2xl font-semibold mb-6">地震發生時緊急應變</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 class="text-lg font-semibold mb-4 text-orange-600">搖晃期間 (0-2分鐘)</h4>
              <ul class="space-y-3">
                <li class="flex items-start">
                  <span class="bg-orange-100 text-orange-800 rounded-full px-2 py-1 text-xs font-bold mr-3 mt-1">1</span>
                  <span>立即執行「趴下、掩護、穩住」</span>
                </li>
                <li class="flex items-start">
                  <span class="bg-orange-100 text-orange-800 rounded-full px-2 py-1 text-xs font-bold mr-3 mt-1">2</span>
                  <span>不要急於逃出建築物</span>
                </li>
                <li class="flex items-start">
                  <span class="bg-orange-100 text-orange-800 rounded-full px-2 py-1 text-xs font-bold mr-3 mt-1">3</span>
                  <span>保護頭頸部，避免被掉落物品砸傷</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 class="text-lg font-semibold mb-4 text-blue-600">搖晃停止後 (2-10分鐘)</h4>
              <ul class="space-y-3">
                <li class="flex items-start">
                  <span class="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs font-bold mr-3 mt-1">1</span>
                  <span>檢查自身及周圍人員傷勢</span>
                </li>
                <li class="flex items-start">
                  <span class="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs font-bold mr-3 mt-1">2</span>
                  <span>關閉瓦斯、電源總開關</span>
                </li>
                <li class="flex items-start">
                  <span class="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs font-bold mr-3 mt-1">3</span>
                  <span>穿鞋子，小心玻璃碎片</span>
                </li>
                <li class="flex items-start">
                  <span class="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs font-bold mr-3 mt-1">4</span>
                  <span>檢查建築物結構安全</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 避難場所資訊 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-2xl font-semibold mb-6">避難場所指引</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center p-4 border-2 border-green-200 rounded-lg">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h4 class="font-semibold mb-2">學校操場</h4>
              <p class="text-sm text-gray-600">開闊平坦，遠離建築物</p>
            </div>
            
            <div class="text-center p-4 border-2 border-blue-200 rounded-lg">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <h4 class="font-semibold mb-2">公園綠地</h4>
              <p class="text-sm text-gray-600">空間寬敞，樹木不密集</p>
            </div>
            
            <div class="text-center p-4 border-2 border-orange-200 rounded-lg">
              <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
              </div>
              <h4 class="font-semibold mb-2">空曠停車場</h4>
              <p class="text-sm text-gray-600">平整地面，無掉落物風險</p>
            </div>
          </div>
        </div>
      </div>
    `

    this.setupEmergencyEventListeners()
  }

  private setupThreeStepsEventListeners(): void {
    document.getElementById('practice-btn')?.addEventListener('click', () => {
      this.startPractice()
    })
  }
  
  private startPractice(): void {
    const practiceBtn = document.getElementById('practice-btn')
    const practiceSteps = document.getElementById('practice-steps')
    const currentStep = document.getElementById('current-step')
    const stepInstruction = document.getElementById('step-instruction')
    const stepCounter = document.getElementById('step-counter')
    const progressBar = document.getElementById('progress-bar-practice')
    
    if (!practiceBtn || !practiceSteps || !currentStep || !stepInstruction || !stepCounter || !progressBar) return
    
    practiceBtn.style.display = 'none'
    practiceSteps.classList.remove('hidden')
    
    const steps = [
      { name: '趴下 (DROP)', instruction: '立即蹲下，用手和膝蓋支撐身體', duration: 3000 },
      { name: '掩護 (COVER)', instruction: '躲到桌子下或用手保護頭部', duration: 3000 },
      { name: '穩住 (HOLD ON)', instruction: '緊握護身物，保持姿勢', duration: 3000 },
      { name: '完成!', instruction: '做得很好！繼續練習直到成為本能反應', duration: 2000 }
    ]
    
    let currentStepIndex = 0
    
    const nextStep = () => {
      if (currentStepIndex < steps.length) {
        const step = steps[currentStepIndex]
        currentStep.textContent = step.name
        stepInstruction.textContent = step.instruction
        stepCounter.textContent = `步驟 ${Math.min(currentStepIndex + 1, 3)} / 3`
        
        const progress = ((currentStepIndex + 1) / steps.length) * 100
        progressBar.style.width = `${progress}%`
        
        currentStepIndex++
        
        if (currentStepIndex <= steps.length) {
          setTimeout(nextStep, step.duration)
        } else {
          setTimeout(() => {
            practiceBtn.style.display = 'inline-block'
            practiceSteps.classList.add('hidden')
            currentStepIndex = 0
          }, 2000)
        }
      }
    }
    
    nextStep()
  }

  private initializePreparationItems(): void {
    this.preparationItems = [
      {
        id: 'water',
        name: '飲用水（每人每日3公升，至少3天份）',
        category: 'basic',
        checked: false,
        description: '緊急避難時的基本生存需求',
      },
      {
        id: 'food',
        name: '乾糧與罐頭食品',
        category: 'basic',
        checked: false,
        description: '不需烹煮的食物，保存期限長',
      },
      {
        id: 'flashlight',
        name: '手電筒與備用電池',
        category: 'basic',
        checked: false,
        description: '停電時的照明設備',
      },
      {
        id: 'radio',
        name: '收音機',
        category: 'basic',
        checked: false,
        description: '接收緊急廣播資訊',
      },
      {
        id: 'blanket',
        name: '毛毯或睡袋',
        category: 'basic',
        checked: false,
        description: '保暖用品',
      },
      {
        id: 'cash',
        name: '現金',
        category: 'basic',
        checked: false,
        description: '緊急時的購買能力',
      },
      {
        id: 'first-aid',
        name: '急救包',
        category: 'medical',
        checked: false,
        description: '處理外傷的基本醫療用品',
      },
      {
        id: 'medicine',
        name: '常用藥品',
        category: 'medical',
        checked: false,
        description: '個人慢性病用藥',
      },
      {
        id: 'mask',
        name: '口罩',
        category: 'medical',
        checked: false,
        description: '防塵與衛生防護',
      },
      {
        id: 'thermometer',
        name: '體溫計',
        category: 'medical',
        checked: false,
        description: '監測健康狀況',
      },
      {
        id: 'id-cards',
        name: '身分證件影本',
        category: 'documents',
        checked: false,
        description: '身份證明與重要證件',
      },
      {
        id: 'insurance',
        name: '保險單據',
        category: 'documents',
        checked: false,
        description: '保險理賠相關文件',
      },
      {
        id: 'bank-info',
        name: '銀行帳戶資料',
        category: 'documents',
        checked: false,
        description: '金融機構聯絡資訊',
      },
      {
        id: 'contact-list',
        name: '緊急聯絡人清單',
        category: 'documents',
        checked: false,
        description: '家人朋友聯絡方式',
      },
      {
        id: 'clothes',
        name: '換洗衣物',
        category: 'personal',
        checked: false,
        description: '至少3天份的衣物',
      },
      {
        id: 'toiletries',
        name: '盥洗用品',
        category: 'personal',
        checked: false,
        description: '基本清潔衛生用品',
      },
      {
        id: 'glasses',
        name: '備用眼鏡',
        category: 'personal',
        checked: false,
        description: '視力矯正設備',
      },
      {
        id: 'feminine',
        name: '女性生理用品',
        category: 'personal',
        checked: false,
        description: '女性專用衛生用品',
      },
    ]
  }

  private renderPreparationChecklist(): void {
    const checklist = document.getElementById('preparation-checklist')
    if (!checklist) return

    const categories = {
      basic: '基本用品',
      medical: '醫療用品',
      documents: '重要證件',
      personal: '個人用品',
    }

    const categoryItems: Record<string, PreparationItem[]> = {}
    this.preparationItems.forEach(item => {
      if (!categoryItems[item.category]) {
        categoryItems[item.category] = []
      }
      categoryItems[item.category].push(item)
    })

    let html = ''
    Object.entries(categories).forEach(([categoryKey, categoryName]) => {
      html += `
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-blue-600 border-b-2 border-blue-200 pb-2">${categoryName}</h4>
          <ul class="space-y-3">
            ${
              categoryItems[categoryKey]
                ?.map(
                  item => `
              <li class="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded">
                <input type="checkbox" id="${item.id}" class="preparation-item mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" ${item.checked ? 'checked' : ''}>
                <div class="flex-1">
                  <label for="${item.id}" class="text-gray-800 font-medium cursor-pointer">${item.name}</label>
                  <p class="text-sm text-gray-600 mt-1">${item.description}</p>
                </div>
              </li>
            `
                )
                .join('') || ''
            }
          </ul>
        </div>
      `
    })

    checklist.innerHTML = html
    this.updatePreparationProgress()
  }

  private renderEmergencyContacts(): void {
    const contactsList = document.getElementById('emergency-contacts-list')
    if (!contactsList) return

    if (this.emergencyContacts.length === 0) {
      contactsList.innerHTML = `
        <div class="text-center text-gray-500 py-8">
          <p>尚未新增緊急聯絡人</p>
          <p class="text-sm">請使用上方表單新增聯絡人資訊</p>
        </div>
      `
      return
    }

    const html = this.emergencyContacts
      .map(
        (contact, index) => `
      <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <div class="font-medium">${contact.name}</div>
          <div class="text-sm text-gray-600">${contact.relationship}</div>
        </div>
        <div class="flex items-center space-x-3">
          <a href="tel:${contact.phone}" class="text-blue-600 font-medium hover:text-blue-800">${contact.phone}</a>
          <button class="remove-contact text-red-600 hover:text-red-800" data-index="${index}">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      </div>
    `
      )
      .join('')

    contactsList.innerHTML = html
  }

  private setupPreparationEventListeners(): void {
    document.getElementById('check-all-btn')?.addEventListener('click', () => {
      this.preparationItems.forEach(item => (item.checked = true))
      this.renderPreparationChecklist()
      this.saveUserData()
    })

    document.getElementById('uncheck-all-btn')?.addEventListener('click', () => {
      this.preparationItems.forEach(item => (item.checked = false))
      this.renderPreparationChecklist()
      this.saveUserData()
    })

    document.getElementById('add-contact-btn')?.addEventListener('click', () => {
      const nameInput = document.getElementById('contact-name') as HTMLInputElement
      const phoneInput = document.getElementById('contact-phone') as HTMLInputElement
      const relationshipInput = document.getElementById('contact-relationship') as HTMLInputElement

      if (nameInput.value && phoneInput.value && relationshipInput.value) {
        this.emergencyContacts.push({
          name: nameInput.value,
          phone: phoneInput.value,
          relationship: relationshipInput.value,
        })

        nameInput.value = ''
        phoneInput.value = ''
        relationshipInput.value = ''

        this.renderEmergencyContacts()
        this.saveUserData()
      }
    })

    document.addEventListener('change', e => {
      const target = e.target as HTMLInputElement
      if (target.classList.contains('preparation-item')) {
        const item = this.preparationItems.find(item => item.id === target.id)
        if (item) {
          item.checked = target.checked
          this.updatePreparationProgress()
          this.saveUserData()
        }
      }
    })

    document.addEventListener('click', e => {
      const target = e.target as HTMLElement
      if (target.classList.contains('remove-contact') || target.closest('.remove-contact')) {
        const button = target.classList.contains('remove-contact')
          ? target
          : target.closest('.remove-contact')
        const index = parseInt(button?.getAttribute('data-index') || '0')
        this.emergencyContacts.splice(index, 1)
        this.renderEmergencyContacts()
        this.saveUserData()
      }
    })
  }

  private setupEmergencyEventListeners(): void {
    document.getElementById('sos-btn')?.addEventListener('click', () => {
      if (confirm('確定要撥打緊急求救電話 119 嗎？')) {
        window.location.href = 'tel:119'

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(_position => {
            // 緊急求救位置已記錄
          })
        }
      }
    })
  }

  private updatePreparationProgress(): void {
    const totalItems = this.preparationItems.length
    const checkedItems = this.preparationItems.filter(item => item.checked).length
    const percentage = Math.round((checkedItems / totalItems) * 100)

    const statusElement = document.getElementById('completion-status')
    const progressBar = document.getElementById('progress-bar')

    if (statusElement) {
      statusElement.textContent = `完成度：${checkedItems} / ${totalItems} 項目 (${percentage}%)`

      if (percentage === 100) {
        statusElement.className = 'text-lg font-semibold mb-4 text-green-600 animate-bounce-in'
      } else if (percentage >= 50) {
        statusElement.className = 'text-lg font-semibold mb-4 text-orange-600 animate-fade-in'
      } else {
        statusElement.className = 'text-lg font-semibold mb-4 text-red-600 animate-shake'
      }
    }

    if (progressBar) {
      progressBar.style.width = `${percentage}%`
      progressBar.className =
        percentage === 100
          ? 'bg-green-600 h-full transition-all duration-1000 progress-bar-animated'
          : 'bg-green-600 h-full transition-all duration-1000'

      if (percentage > 0) {
        progressBar.style.animation = 'progress-fill 1s ease-out'
        setTimeout(() => {
          progressBar.style.animation = ''
        }, 1000)
      }
    }
  }

  private setupEventListeners(): void {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu')
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden')
          const mobileMenuButton = document.getElementById('mobile-menu-button')
          if (mobileMenuButton) {
            mobileMenuButton.setAttribute('aria-expanded', 'false')
          }
        }
      }
    })

    window.addEventListener('resize', () => {
      const mobileMenu = document.getElementById('mobile-menu')
      if (window.innerWidth >= 768 && mobileMenu) {
        mobileMenu.classList.add('hidden')
        const mobileMenuButton = document.getElementById('mobile-menu-button')
        if (mobileMenuButton) {
          mobileMenuButton.setAttribute('aria-expanded', 'false')
        }
      }
    })
  }

  private saveUserData(): void {
    const userData = {
      preparationItems: this.preparationItems,
      emergencyContacts: this.emergencyContacts,
    }
    localStorage.setItem('earthquake-prevention-data', JSON.stringify(userData))
  }

  private loadUserData(): void {
    const savedData = localStorage.getItem('earthquake-prevention-data')
    if (savedData) {
      try {
        const userData = JSON.parse(savedData)
        if (userData.preparationItems) {
          userData.preparationItems.forEach((savedItem: PreparationItem) => {
            const item = this.preparationItems.find(item => item.id === savedItem.id)
            if (item) {
              item.checked = savedItem.checked
            }
          })
        }
        if (userData.emergencyContacts) {
          this.emergencyContacts = userData.emergencyContacts
        }
      } catch {
        // 載入用戶資料失敗
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new EarthquakePreventionApp()
})