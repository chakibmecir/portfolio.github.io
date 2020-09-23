{
	setTimeout(() => document.body.classList.add('render'), 60);
	const navdemos = Array.from(document.querySelectorAll('nav.demos > .demo'));
	const total = navdemos.length;
	const current = navdemos.findIndex(el => el.classList.contains('demo--current'));
	const navigate = (linkEl) => {
		document.body.classList.remove('render');
		document.body.addEventListener('transitionend', () => window.location = linkEl.href);
	};
	navdemos.forEach(link => link.addEventListener('click', (ev) => {
		ev.preventDefault();
		navigate(ev.target);
	}));
	document.addEventListener('keydown', (ev) => {
		const keyCode = ev.keyCode || ev.which;
		let linkEl;
		if ( keyCode === 37 ) {
			linkEl = current > 0 ? navdemos[current-1] : navdemos[total-1];
		}
		else if ( keyCode === 39 ) {
			linkEl = current < total-1 ? navdemos[current+1] : navdemos[0];
		}
		else {
			return false;
		}
		navigate(linkEl);
	});
}

{
	const items = Array.from(document.querySelectorAll('.menu > .menu__item'));

	class Item {
		constructor(el) {
			this.DOM = {};
			this.DOM.el = el;
			this.DOM.name = el.querySelector('.menu__item-name');
			charming(this.DOM.name);
			this.DOM.nameLetters = Array.from(this.DOM.name.querySelectorAll('span'));
			this.initEvents();
		}
		initEvents() {
			this.mouseenterFn = () => this.mouseTimeout = setTimeout(() => {
				this.isActive = true;
				anime.remove(this.DOM.nameLetters);
				anime({
					targets: this.DOM.nameLetters,
					duration: 800,
					easing: [0.7,0,0.3,1],
					scale: (t,i) => [1,anime.random(0,1) ? 0.8:1.4],
					translateX: (t,i) => {
						const elBounds = this.DOM.el.getBoundingClientRect();
						const x1 = elBounds.left + elBounds.width/2;
						const y1 = elBounds.top + elBounds.height/2;
						
						const targetBounds = t.getBoundingClientRect();
						const x2 = targetBounds.left + targetBounds.width/2;
						const y2 = targetBounds.top + targetBounds.height/2;

						const dist = Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
						const maxDist = Math.sqrt(Math.pow(elBounds.left-x1,2) + Math.pow(elBounds.top-y1,2));
						const maxTX = x2<x1?-250:250;

						return maxTX/maxDist*dist;
					},
					translateY: (t,i) => [0,anime.random(-40,40)],
					rotateZ: (t,i) => [0,anime.random(-20,20)],
					opacity: (t,i) => 0.3,
				});	
			}, 50);

			this.mouseleaveFn = () => {
				clearTimeout(this.mouseTimeout);
				if( !this.isActive ) return;
				this.isActive = false;
				anime.remove(this.DOM.nameLetters);
				anime({
					targets: this.DOM.nameLetters,
					duration: 800,
					easing: [0.7,0,0.3,1],
					scale: 1,
					translateX: 0,
					translateY: 0,
					rotateZ: 0,
					opacity: 1
				});
			};

			this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
			this.DOM.el.addEventListener('touchstart', this.mouseenterFn);
			this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
			this.DOM.el.addEventListener('touchend', this.mouseleaveFn);
		}
	};

	items.forEach(item => new Item(item));
};





var redo = document.querySelector('.red__overlay')
var blacko = document.querySelector('.black__overlay')
var button = document.querySelector('.menu__toggle')
const textrev = gsap.timeline();

button.onclick = function() {
    if ( redo.clientWidth === 0 , blacko.clientWidth === 0){
      gsap.to('.red__overlay',  {duration: .5, delay: 0, width: "100vw", ease: Expo.easeOut,});
      gsap.to('.black__overlay',  {duration: .5, delay: .4, width: "100vw", ease: Expo.easeOut,});
      textrev.from(".line-skewed", 1.8, {
        y: 30,
        ease: "power4.out",
        delay: 1,
		skewY: 10,
        stagger: {
            amount: 0.4,
        },
    })
        textrev.to(".line-skewed",{
        opacity: 1,
		delay: -2.1,
		
        });

        textrev.to(".frame__links",{
            opacity: 0,
            delay: -4,
            });

            textrev.to(".logo-img",{
                opacity: 0,
                delay: -4,
                });
    ;
    } else {
        textrev.to(".line-skewed", {
			opacity: 0,
			
            ease: "power4.out",
        });
        gsap.to('.black__overlay',  {duration: .5, delay: 0.5, width: "0vw", ease: Expo.easeOut,});
        gsap.to('.red__overlay',  {duration: .5, delay: 1, width: "0vw", ease: Expo.easeOut,});

        textrev.to(".frame__links",{
            opacity: 1,
            });

            textrev.to(".logo-img",{
                opacity: 1,
                });

    }
     
}

$(document).ready(function(){
	$('.menu__toggle').click(function(){
		$("#nav-icon4").toggleClass('open');
	});
});






  