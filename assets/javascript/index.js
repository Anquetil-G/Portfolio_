let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let loaderIsEnd = false;

const lenis = new Lenis({
		duration: 0.8, // Ajustez la durée (plus grand = plus lent)
		easing: (t) => t * (2 - t),
    smooth: true,
});
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
};
requestAnimationFrame(raf);

lenis.on('scroll', ({ scroll }) => {
	if (scroll > window.innerWidth * 2 + window.innerHeight) {
		// projects.style.transform = `translate(-${window.innerWidth * 2 + window.innerHeight}px, ${window.innerWidth * 2 + window.innerHeight}px)`
	} else if (scroll < window.innerHeight) {
		projects.style.transform = `translate(0, 0)`
	} else if (scroll > window.innerHeight) {
		projects.style.transform = `translate(-${scroll - window.innerHeight}px, ${scroll - window.innerHeight}px)`
	};
	projectCubeContainer.style.left = `${190 + (scroll - window.innerHeight)}px`
	if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
		if (loaderIsEnd) {
			transformPage();
		};
  };
});

const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
		entry.target.style.opacity = "1";
	}
});

const textReveal = () => {
	lenis.on('scroll', () => {
		const revealTexts = document.getElementsByClassName("reveal-text");
		for (const revealText of revealTexts) {
			observer.observe(revealText);
		};
	});
};
textReveal();

new FinisherHeader({
  "count": 40,
  "size": {
    "min": 1003,
    "max": 1500,
    "pulse": 1.5
  },
  "speed": {
    "x": {
      "min": 2.5,
      "max": 3.7
    },
    "y": {
      "min": 2.5,
      "max": 3.7
    }
  },
  "colors": {
    "background": "#000000",
    "particles": [
      "#050505",
      "#0F0F0F",
      "#1A1A1A",
      "#292929"
    ]
  },
  "blending": "none",
  "opacity": {
    "center": 0.6,
    "edge": 0
  },
  "skew": -0.1,
  "shapes": [
    "c"
  ]
});

goToProjectsButton.addEventListener("click", () => {
	lenis.scrollTo(projects, {
    immediate: false,
		duration: 0.7,
		easing: (t) => 1 - Math.pow(1 - t, 1.9)
  });
	const revealTexts = document.getElementsByClassName("reveal-text");
	for (const revealText of revealTexts) {
		for (const classes of revealText.classList) {
			if (classes === "reveal-text-project1") {
				revealText.style.opacity = "1";
      };
		};
	};
});
goToAboutButton.addEventListener("click", () => {
	lenis.scrollTo(about, {
    immediate: false,
		duration: 2.2,
		easing: (t) => 1 - Math.pow(1 - t, 1.9),
  });
	const revealTexts = document.getElementsByClassName("reveal-text");
	for (const revealText of revealTexts) {
		for (const classes of revealText.classList) {
			if (classes === "reveal-text-about") {
				revealText.style.opacity = "1";
      };
		};
	};
});
goToContactButton.addEventListener("click", () => {
	lenis.scrollTo(contact, {
    immediate: false,
		duration: 2,
		easing: (t) => 1 - Math.pow(1 - t, 1.9),
  });
	const revealTexts = document.getElementsByClassName("reveal-text");
	for (const revealText of revealTexts) {
		for (const classes of revealText.classList) {
			if (classes === "reveal-text-contact") {
				setTimeout(() => {
					revealText.style.opacity = "1";
				}, 2.2);
      };
		};
	};
});

window.addEventListener("mousemove", (e) => {
	mouseX = e.clientX;
	mouseY = e.clientY;
});

const animateCursor = () => {
	cursorX += (mouseX - cursorX) * 0.085;
	cursorY += (mouseY - cursorY) * 0.085;

	customCursor.style.transform = `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%))`;

	requestAnimationFrame(animateCursor);
};

const transitionText = (targetString, element, time) => {
	const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ(())@@##&&++';
	const originalText = element.textContent;
	const maxLength = Math.max(originalText.length, targetString.length);
	
	let currentText = originalText.padEnd(maxLength, ' ');
	const targetText = targetString.padEnd(maxLength, ' ');

	const transitionTime = time; // Temps total de transition en millisecondes
	const intervalTime = 85; // Intervalle entre chaque étape en millisecondes
	const totalSteps = transitionTime / intervalTime;
	let currentStep = 0;

	// Tableau pour stocker le temps restant pour chaque lettre
	const stepsRemaining = Array.from({ length: maxLength }, () => Math.floor(Math.random() * totalSteps));

	const interval = setInterval(() => {
			let newText = '';
			for (let i = 0; i < maxLength; i++) {
					if (stepsRemaining[i] > 0) {
							// Génère une lettre aléatoire si la transition pour cette lettre n'est pas terminée
							newText += alphabet[Math.floor(Math.random() * alphabet.length)];
							stepsRemaining[i]--;
					} else {
							// Utilise la lettre finale si la transition pour cette lettre est terminée
							newText += targetText[i];
					}
			}
			
			element.textContent = newText;
			currentText = newText;

			if (stepsRemaining.every(steps => steps <= 0)) {
					clearInterval(interval);
					element.textContent = targetString; // Assure le résultat final correct
			}

			currentStep++;
	}, intervalTime);
}

const hoverElements = () => {
	const elements = document.getElementsByClassName("default-hover");
	for (const element of elements) {
		element.addEventListener("mouseover", () => {
			transitionText(element.getAttribute('hover-text'), element, 680);
			customCursor.style.width = "4px"
			customCursor.style.height = "4px"
		});
		element.addEventListener("mouseleave", () => {
			transitionText(element.getAttribute('default-text'), element, 680);
			customCursor.style.width = "14px"
			customCursor.style.height = "14px"
		});
	};
	setInterval(() => {
		transitionText(callToScroll.getAttribute('hover-text'), callToScroll, 780);
		setTimeout(() => {
			transitionText(callToScroll.getAttribute('default-text'), callToScroll, 780);
		}, 1500);
	}, 5000);
};

const loadingPage = () => {
	transitionText(loaderPageTitle.textContent, loaderPageTitle, 3000);
	transitionText(loaderPageSubtitle.textContent, loaderPageSubtitle, 3000);
  setTimeout(() => {
		loaderTitles.style.color = "#00000000";
		setTimeout(() => {
			for (let i = 0; i < 20; i++) {
				setTimeout(() => {
					const bgLoaderPage = document.getElementById("bgLoaderPage" + (i + 1));
					bgLoaderPage.style.transform = "scaleY(0)";
				}, i * 25);
			}
			setTimeout(() => {
				loaderPage.style.display = 'none';
				content.style.display = 'block';
				loaderIsEnd = true;
				console.log("stop");
			}, 20 * 25 + 500);
		}, 450);
  }, 4000);
};

const transformPage = () => {
	lineColor1.classList.add("lineColor1Anim");
	lineColor2.classList.add("lineColor2Anim");
	lineColor3.classList.add("lineColor3Anim");
	lineColor4.classList.add("lineColor4Anim");
	lineColor5.classList.add("lineColor5Anim");
	const inverse = document.querySelectorAll(".inverse");
	inverse.forEach(element => {
		element.style.mixBlendMode = 'difference';
		element.style.color = '#ffd6f6';
	});
	heroHeaderImg.src = "./assets/img/hero-header2.jpg";
	const imgBlocks = document.querySelectorAll("#heroHeader .image .img-blocks .block");
	imgBlocks.forEach(imgBlock => {
		imgBlock.style.background = 'rgb(233 204 218 / 87%)';
	});
	const imgOverlay = document.querySelector("#heroHeader .image .img-overlay");
	imgOverlay.style.background = 'rgb(20 0 11)';
}

window.addEventListener("load", () => {
	hoverElements();
	animateCursor();
	loadingPage();
});

const blocks = document.querySelectorAll("#heroHeader .image .img-blocks .block")
const resetDuration = 375
blocks.forEach(block => {
	let timeoutId;

	block.addEventListener("mouseover", () => {
    clearTimeout(timeoutId);
		block.classList.add("active");
		timeoutId = setTimeout(() => block.classList.remove("active"), resetDuration);
  })
})