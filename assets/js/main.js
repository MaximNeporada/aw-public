"use strict";

var BREAKPOINTS = {
  mobile: 768
};
document.addEventListener('DOMContentLoaded', function () {
  mainSliderInit();
  parallaxInit();
  projectElementsInit();
  headerInit();
});
var timerBodyClass = null;

var toggleLockBody = function toggleLockBody(lock) {
  var body = document.querySelector('body');
  var darkBody = document.querySelector('.dark-body');

  if (!darkBody || !body) {
    return;
  }

  ;
  var delay = 100;

  if (window.innerWidth <= BREAKPOINTS.mobile) {
    delay = 0;
  }

  var bodyLockRemove = function bodyLockRemove() {
    clearTimeout(timerBodyClass);

    if (!lock) {
      timerBodyClass = setTimeout(function () {
        body.style.paddingRight = null;
        body.classList.remove('_lock');
        darkBody.classList.remove('_active');
      }, delay);
    }
  };

  var bodyLockAdd = function bodyLockAdd() {
    clearTimeout(timerBodyClass);

    if (lock) {
      timerBodyClass = setTimeout(function () {
        body.style.paddingRight = window.innerWidth - body.offsetWidth + 'px';
        body.classList.add('_lock');
        darkBody.classList.add('_active');
      }, delay);
    }
  };

  if (lock) {
    bodyLockAdd();
  } else {
    bodyLockRemove();
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth <= BREAKPOINTS.mobile) {
      delay = 0;
    } else {
      delay = 100;
    }
  });
};

var mainSliderInit = function mainSliderInit() {
  var CLASS = {
    main: 'sliders-main',
    slider: 'sliders-main__slider'
  };
  var slidersMain = document.querySelectorAll(".".concat(CLASS.main));
  slidersMain.forEach(function (sliderBlock) {
    var sliders = sliderBlock.querySelectorAll(".".concat(CLASS.slider));
    var optionsSlider = {
      direction: 'vertical',
      loop: true,
      speed: 1500,
      allowTouchMove: false,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        reverseDirection: true
      }
    };
    sliders.forEach(function (slide) {
      var swiper = new Swiper(slide, optionsSlider);
    });
  });
};

var parallaxInit = function parallaxInit() {
  var main = document.querySelector('main');
  var header = document.querySelector('.header');
  var parallaxTop = document.querySelector('.parallax-top');
  var parallaxBottom = document.querySelector('.parallax-bottom');

  if (!parallaxTop && !parallaxBottom) {
    return;
  }

  var windowWidth = window.outerWidth;

  var setParamsParallaxTop = function setParamsParallaxTop(element) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
    windowWidth = window.outerWidth;

    if (windowWidth >= BREAKPOINTS.mobile) {
      var headerHeight = header.offsetHeight;
      var elementHeight = element.offsetHeight;
      element.style.position = 'fixed';
      element.style.left = 0;

      if (type === 'top') {
        element.style.top = headerHeight + 'px';
        main.style.paddingTop = elementHeight + 'px';
        element.style.zIndex = 2;
      } else {
        element.style.bottom = 0;
        main.style.paddingBottom = elementHeight + 'px';
        element.style.zIndex = 1;
      }
    } else {
      element.style.position = null;
      element.style.left = null;
      element.style.zIndex = null;
      element.style.top = null;
      main.style.paddingTop = null;
    }
  };

  if (parallaxTop) {
    setParamsParallaxTop(parallaxTop);
    window.addEventListener('resize', function () {
      setParamsParallaxTop(parallaxTop);
    });
  }

  if (parallaxBottom) {
    setParamsParallaxTop(parallaxBottom, 'bottom');
    window.addEventListener('resize', function () {
      setParamsParallaxTop(parallaxBottom, 'bottom');
    });
  }

  window.addEventListener('scroll', function () {
    if (!parallaxTop && !parallaxBottom) {
      return;
    }

    if (windowWidth >= BREAKPOINTS.mobile) {
      var scrollY = window.scrollY;

      if (parallaxTop && scrollY > parallaxTop.offsetHeight) {
        parallaxTop.style.zIndex = 0;
      } else {
        parallaxTop.style.zIndex = 2;
      }
    }
  });
};

var projectElementsInit = function projectElementsInit() {
  var projectsBlock = document.querySelector('.projects');

  if (projectsBlock) {
    var CLASS = {
      content: 'projects__content',
      start: 'projects__start-info',
      more: 'projects__more-info',
      slider: {
        block: 'img-slider',
        nextBtn: 'swiper-button-next',
        prevBtn: 'swiper-button-prev',
        pagination: 'swiper-pagination'
      },
      buttonBlock: 'projects__show-more-block',
      buttonShowMore: 'projects__show-more',
      _show: '_show'
    };
    var TEXT = {
      buttons: {
        show: '???????????????? ??????????????????',
        hide: '????????????????'
      }
    };
    var projects = projectsBlock.querySelectorAll('.projects__item');
    projects.forEach(function (item) {
      var content = item.querySelector(".".concat(CLASS.content));
      var moreBlock = item.querySelector(".".concat(CLASS.more));
      var buttonShowMore = item.querySelector(".".concat(CLASS.buttonShowMore));

      if (buttonShowMore) {
        var textShow = buttonShowMore.dataset.show || TEXT.buttons.show;
        var textHide = buttonShowMore.dataset.hide || TEXT.buttons.hide; // SHOW MORE EVENTS

        var showMoreBlock = function showMoreBlock() {
          if (moreBlock) {
            moreBlock.style.height = moreBlock.scrollHeight + 'px';
            content.classList.add(CLASS._show);
            buttonShowMore.textContent = textHide;
          }
        };

        var hideMoreBlock = function hideMoreBlock() {
          if (moreBlock) {
            moreBlock.style.height = null;
            content.classList.remove(CLASS._show);
            buttonShowMore.textContent = textShow;
          }
        };

        var toggleShowMore = function toggleShowMore() {
          if (!content.classList.contains(CLASS._show)) {
            showMoreBlock();
            return;
          }

          hideMoreBlock();
        };

        var initContentBlock = function initContentBlock() {
          if (moreBlock && moreBlock.scrollHeight === 0) {
            moreBlock.style.display = 'none';
            var buttonBlock = item.querySelector(".".concat(buttonBlock));
            buttonBlock.style.display = 'none';
          }

          if (content.classList.contains(CLASS._show)) {
            showMoreBlock();
          }
        };

        buttonShowMore.addEventListener('click', toggleShowMore);
        window.addEventListener('resize', function () {
          initContentBlock();
        });
        initContentBlock();
      } //    SWIPER EVENTS


      var sliders = item.querySelectorAll(".".concat(CLASS.slider.block));
      var sliderOptions = {
        slidesPerView: 2,
        loop: false
      };
      sliders.forEach(function (slider) {
        var nextButton = slider.querySelector(".".concat(CLASS.slider.nextBtn));
        var prevButton = slider.querySelector(".".concat(CLASS.slider.prevBtn));
        var pagination = slider.querySelector(".".concat(CLASS.slider.pagination));
        var swiperOptions = Object.assign(sliderOptions, {
          navigation: {
            nextEl: nextButton,
            prevEl: prevButton
          },
          pagination: {
            el: pagination,
            type: 'bullets',
            clickable: true
          }
        });
        var swiperImg = new Swiper(slider, swiperOptions);
      });
    });
  }
};

var headerInit = function headerInit() {
  var CLASS = {
    main: 'header',
    headerNewColor: 'new-color',
    logoBlock: 'header__logo-block',
    menu: 'header__menu',
    burger: 'js-menu-open',
    buttonCLose: 'js-menu-close',
    popup: 'menu__popup',
    tab: 'menu__tab',
    activeTab: '_active',
    tabsDecorationLine: 'menu__decoration-line',
    menuTabBlock: 'menu__tab-block',
    menuList: 'menu__list',
    _open: '_open',
    titleBLock: 'header__title-block',
    headerTitle: 'header__title',
    _first: '_first',
    _second: '_second',
    titleBlockItem: 'title',
    project: 'projects  ',
    projectItem: 'projects__item'
  };
  var header = document.querySelector(".".concat(CLASS.main));
  var headerHeight = header.offsetHeight;

  if (!header) {
    return;
  } //     MENU EVENTS


  var buttonOpenMenu = header.querySelector(".".concat(CLASS.burger));
  var buttonCloseMenu = header.querySelector(".".concat(CLASS.buttonCLose));
  var menu = header.querySelector(".".concat(CLASS.menu));

  var openMenu = function openMenu() {
    menu.classList.add(CLASS._open);
    header.classList.add(CLASS._open);
    toggleLockBody(true);
  };

  var closeMenu = function closeMenu() {
    menu.classList.remove(CLASS._open);
    header.classList.remove(CLASS._open);
    toggleLockBody(false);
  };

  buttonOpenMenu.addEventListener('click', openMenu);
  buttonCloseMenu.addEventListener('click', closeMenu);
  document.addEventListener('click', function (e) {
    var target = e.target;
    var isMenu = target == menu || menu.contains(target);
    var isOpenMenu = menu.classList.contains(CLASS._open);

    if (!isMenu && isOpenMenu) {
      closeMenu();
    }
  }); //    TABS

  var tabs = header.querySelectorAll(".".concat(CLASS.tab));
  var line = header.querySelector(".".concat(CLASS.tabsDecorationLine));
  var currentTab = header.querySelector(".".concat(CLASS.tab, ".").concat(CLASS.activeTab));
  var currentIdBlock = currentTab.dataset.tab;

  var setLinePosition = function setLinePosition(activeTab) {
    if (!activeTab || !line) {
      return;
    }

    var widthTab = activeTab.offsetWidth;
    var positionTab = activeTab.offsetLeft;
    line.style.width = widthTab + 'px';
    line.style.left = positionTab + 'px';
  };

  var activatedBlock = function activatedBlock(idBlock) {
    var block = header.querySelector(".".concat(CLASS.menuTabBlock, "[data-tab=\"").concat(idBlock, "\"]"));

    if (!block) {
      return;
    }

    var activeBlocks = header.querySelectorAll(".".concat(CLASS.menuTabBlock, ".").concat(CLASS.activeTab));
    activeBlocks.forEach(function (activeBlock) {
      activeBlock.classList.remove(CLASS.activeTab);
    });
    block.classList.add(CLASS.activeTab);
  };

  setLinePosition(currentTab);
  activatedBlock(currentIdBlock);
  tabs.forEach(function (tab) {
    var idBlock = tab.dataset.tab;
    tab.addEventListener('click', function () {
      if (tab.classList.contains(CLASS.activeTab)) {
        return;
      }

      var activeTabs = header.querySelectorAll(".".concat(CLASS.tab, ".").concat(CLASS.activeTab));
      activeTabs.forEach(function (activeTab) {
        activeTab.classList.remove(CLASS.activeTab);
      });
      tab.classList.add(CLASS.activeTab);
      setLinePosition(tab);
      activatedBlock(idBlock);
    });
  }); //    MENU LINKS

  var menuItems = header.querySelectorAll(".".concat(CLASS.menuList, " a"));

  var getHash = function getHash(link) {
    var href = link.getAttribute('href');
    var hash = href.split('#')[1];
    return hash;
  };

  menuItems.forEach(function (link) {
    var hash = getHash(link);

    if (hash) {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        if (link.classList.contains(CLASS.activeTab)) {
          return;
        }

        var scrollBlock = document.querySelector("#".concat(hash));

        if (scrollBlock) {
          var viewportOffset = scrollBlock.getBoundingClientRect();
          var topPosition = viewportOffset.top;
          console.log(viewportOffset);
          var height = window.scrollY + topPosition + 4;
          closeMenu();
          window.scrollTo({
            top: height,
            behavior: 'smooth'
          });
        }
      });
    }
  }); //    EVENTS SCROLL

  var project = document.querySelector(".".concat(CLASS.project));
  var projectItems = project.querySelectorAll(".".concat(CLASS.projectItem));
  var headerTitleBLock = document.querySelector(".".concat(CLASS.titleBLock));
  projectItems.forEach(function (item) {
    var scrollBlockColor = item.style.getPropertyValue('--title-color');
    var scrollBlockBgColor = item.style.getPropertyValue('--bg-color');
    var title = item.querySelector(".".concat(CLASS.titleBlockItem));
    var newElement = document.createElement("p");
    newElement.classList.add(CLASS.headerTitle);
    newElement.textContent = title.textContent;
    newElement.dataset.color = scrollBlockColor;
    newElement.dataset.bgColor = scrollBlockBgColor;
    newElement.style.color = scrollBlockColor;
    newElement.dataset.id = item.getAttribute('id');
    headerTitleBLock.append(newElement);
  });

  var setHeaderActive = function setHeaderActive(idBlock) {
    var title = headerTitleBLock.querySelector(".".concat(CLASS.headerTitle, "[data-id=\"").concat(idBlock, "\"]"));

    if (!title) {
      clearHeaderActive();
    }

    var topTitle = title.offsetTop;
    var colorTitle = title.dataset.color;
    var bgColorTitle = title.dataset.bgColor;
    header.style.setProperty('--header-color', colorTitle);
    header.style.setProperty('--header-bg', bgColorTitle);
    header.classList.add(CLASS.headerNewColor);
    headerTitleBLock.style.top = -topTitle + 'px';
  };

  var clearHeaderActive = function clearHeaderActive(idBlock) {
    header.style.removeProperty('--header-color');
    header.classList.remove(CLASS.headerNewColor);
    headerTitleBLock.style.top = null;
    var link = document.querySelectorAll(".".concat(CLASS.menuList));
    link.forEach(function (el) {
      el.classList.remove(CLASS.activeTab);
    });
  };

  var activeBlockOnScroll = function activeBlockOnScroll(block, windowScroll) {
    var viewportOffset = block.getBoundingClientRect();
    var topPosition = viewportOffset.top;
    var bottomPosition = viewportOffset.bottom;

    if (topPosition <= 0 && bottomPosition > 0) {
      console.log(block, 'this');
      var activeLinks = document.querySelectorAll(".".concat(CLASS.menuList, " a.").concat(CLASS.activeTab));
      activeLinks.forEach(function (el) {
        el.classList.remove(CLASS.activeTab);
      });
      var idBlock = block.getAttribute('id');

      if (idBlock) {
        var link = document.querySelector(".".concat(CLASS.menuList, " a[href=\"#").concat(idBlock, "\"]"));

        if (link) {
          link.classList.add(CLASS.activeTab);
        }

        setHeaderActive(idBlock);
      } // .style.getPropertyValue('--main-bg-color');

    }
  };

  var projectsViewPort = function projectsViewPort() {
    var windowScroll = window.scrollY;
    var projectsRect = project.getBoundingClientRect();
    var projectsTop = projectsRect.top;
    var projectsBottom = projectsRect.bottom;

    if (projectsTop <= 0 && projectsBottom > 0) {
      projectItems.forEach(function (block) {
        activeBlockOnScroll(block, windowScroll);
      });
    } else {
      clearHeaderActive();
    }
  };

  projectsViewPort();
  window.addEventListener('scroll', function () {
    projectsViewPort();
  });
}; // show more in menu ...


var showMoreInit = function showMoreInit() {
  var CLASS = {
    main: 'show-more',
    content: 'show-more__content',
    button: 'show-more__button',
    buttonBlock: 'show-more__button-block'
  };
};