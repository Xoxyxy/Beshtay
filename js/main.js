document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger'),
    menu = document.querySelector('.nav'),
    menuLinks = document.querySelectorAll('.nav__link'),
    body = document.body;
  const showMenu = () => {
    burger.classList.toggle('burger--active');
    menu.classList.toggle('nav--active');
    menuLinks.forEach(link => {
      link.classList.toggle('nav__link--active');
    });
    body.classList.toggle('body--fixed');
  };
  const hideMenu = () => {
    burger.classList.remove('burger--active');
    menu.classList.remove('nav--active');
    menuLinks.forEach(link => {
      link.classList.remove('nav__link--active');
    });
    body.classList.remove('body--fixed');
  };
  burger.addEventListener('click', showMenu);
  menuLinks.forEach(link => {
    link.addEventListener('click', hideMenu);
  });

  const header = document.querySelector('.header');
  const fixedHeader = () => {
    let scroll = document.documentElement.scrollTop;
    if (scroll > 200) {
      header.classList.add('header--fixed');
    } else {
      header.classList.remove('header--fixed');
    }
  };
  document.addEventListener('scroll', fixedHeader);

  const windowWidth = document.documentElement.clientWidth;
  if (windowWidth > 992) {
    const sections = document.querySelectorAll('.section'),
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            menuLinks.forEach(link => {
              const linkHref = link.getAttribute('href').replace('#', '');
              if (linkHref == entry.target.id) {
                link.classList.add('nav__link--select');
              } else {
                link.classList.remove('nav__link--select');
              }
            });
          }
        });
      }, {
        threshold: 0.55
      });
    sections.forEach(section => {
      observer.observe(section);
    });
  }
  header.addEventListener('click', event => {
    if (event.target.classList.contains('nav__link')) {
      event.preventDefault();
      const sectionId = event.target.getAttribute('href').replace('#', '');
      window.scrollTo({
        top: document.getElementById(sectionId).offsetTop - 66,
        behavior: 'smooth'
      });
    }
  });

  const gallery = new Swiper('.gallery__slider', {
    slidesPerView: '1',
    spaceBetween: 20,
    centeredSlides: false,
    loop: true,
    navigation: {
      nextEl: '.gallery__btn--next',
      prevEl: '.gallery__btn--prev'
    },
    breakpoints: {
      993: {
        slidesPerView: '2',
        spaceBetween: 100,
        centeredSlides: true
      },
      768: {
        slidesPerView: '2'
      }
    }
  });
  const reviews = new Swiper('.reviews__slider', {
    slidesPerView: '1',
    loop: true,
    spaceBetween: 90,
    navigation: {
      nextEl: '.reviews__btn--next'
    }
  });
})