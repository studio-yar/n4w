$(function(){
	// Ленивая загрузка
	observer = lozad('.lozad', {
		rootMargin: '400px 600px',
		threshold: 0,
		loaded: function(el) {
			el.classList.add('loaded')
		}
	})

	observer.observe()


	// Проверка браузера
	if ( !supportsCssVars() ) {
		$('body').addClass('lock')
		$('.supports_error').addClass('show')
	}


	// Запустить видео
	$('body').on('click', '.video-section__play', function(e) {
    	e.preventDefault()

    	$(this).fadeOut()

    	var video = $(this).data('video')

    	$(this).next().attr("src", video+'?autoplay=1;rel=0;enablejsapi=1&amp')
    })
})


$(window).on("load", function (e) {
	if( $(window).width() > 1024 ){
		// Анимации
		AOS.init({
			offset: -100,
			delay: 50,
			duration: 1000
		})

		// init
		var controller = new ScrollMagic.Controller()

		var productDesc1 = new TimelineLite()

		new ScrollMagic.Scene({
			triggerElement: '#product-landing1',
			duration: '80%',
			triggerHook: 'onLeave'
		})
		.setTween(productDesc1)
		.setClassToggle('#product-landing1 .product-landing__sector', 'fixed')
		.addTo(controller)

		var productDesc2 = new TimelineLite()

		new ScrollMagic.Scene({
			triggerElement: '#product-landing2',
			duration: '130%'
		})
		.setTween(productDesc2)
		.setClassToggle('#product-landing2 .product-landing__sector', 'fixed')
		.on('progress', function (e) {
			if (e.progress == 0) {
				$('#product-landing1 .product-landing__sector').removeClass('hide')
			} else {
				$('#product-landing1 .product-landing__sector').addClass('hide')
			}
		})
		.addTo(controller)

		var productDesc3 = new TimelineLite()

		new ScrollMagic.Scene({
			triggerElement: '#product-landing3',
			duration: '130%'
		})
		.setTween(productDesc3)
		.setClassToggle('#product-landing3 .product-landing__sector', 'fixed')
		.addTo(controller)

		var productDesc4 = new TimelineLite()

		new ScrollMagic.Scene({
			triggerElement: '#product-landing4',
			duration: '130%'
		})
		.setTween(productDesc4)
		.setClassToggle('#product-landing4 .product-landing__sector', 'fixed')
		.addTo(controller)

		var productDesc5 = new TimelineLite()

		new ScrollMagic.Scene({
			triggerElement: '#product-landing5',
			duration: '130%'
		})
		.setTween(productDesc5)
		.setClassToggle('#product-landing5 .product-landing__sector', 'fixed')
		.addTo(controller)

		var videoS = new TimelineLite()

		new ScrollMagic.Scene({
			triggerElement: '.video-holder',
			duration: '100%',
			triggerHook: 'onEnter',
			offset: '-100'
		})
		.setTween(videoS)
		.setClassToggle('#product-landing5 .product-landing__sector', 'hideLast')
		.addTo(controller)


		var lastImg = new TimelineLite()
		.to('.last-section__img img', 1, {width: '100%'})

		new ScrollMagic.Scene({
			triggerElement: '.last-section_bg',
			duration: '130%',
			triggerHook: 'onEnter'
		})
		.setTween(lastImg)
		.addTo(controller)


		var whoSuits = new TimelineLite()
		.add([
			TweenMax.fromTo('.who-suits__img img', 2, {top: 200}, {delay: .5, top: 0}),
			TweenMax.fromTo('.who-suits__dots2', 2, {bottom: 100}, {delay: .5, bottom: 0}),
			TweenMax.fromTo('.who-suits__dots1', 2, {left: -200}, {delay: .5, left: 0}),
			TweenMax.to('.who-suits__logoAbs', 3, {x: '-15%'})
		])

		new ScrollMagic.Scene({
			triggerElement: '.who-suits',
			duration: '120%',
			triggerHook: 'onEnter'
		})
		.setTween(whoSuits)
		.addTo(controller)

		var aboutS = new TimelineLite()
		.add([
			TweenMax.fromTo('.section-about__img img', 2, {y: 100}, {delay: .5, y: 0}),
			TweenMax.fromTo('.section-about__nothing', 2, {y: 200}, {delay: 1, y: 0}),
		])

		new ScrollMagic.Scene({
			triggerElement: '.section-about',
			duration: '120%',
			triggerHook: 'onEnter'
		})
		.setTween(aboutS)
		.addTo(controller)

		var infoS = new TimelineLite()
		.add([
			TweenMax.fromTo('.section-info__img img', 1, {y: 150}, {delay: .5, y: 0}),
		])

		new ScrollMagic.Scene({
			triggerElement: '.section-info',
			duration: '100%',
			triggerHook: 'onEnter'
		})
		.setTween(infoS)
		.addTo(controller)
	}
})


// Вспомогательные функции
var supportsCssVars = function() {
    var s = document.createElement('style'),
	support

    s.innerHTML = ":root { --tmp-var: bold; }"
    document.head.appendChild(s)
    support = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)'))
    s.parentNode.removeChild(s)

    return support
}