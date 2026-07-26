class ImageSlider {
    constructor(selector) {
        this.slider = document.querySelector(selector);

        this.track = this.slider.querySelector(".slider-track");
        this.slides = Array.from(this.track.children);

        this.prevBtn = this.slider.querySelector(".prev");
        this.nextBtn = this.slider.querySelector(".next");

    
        this.dotContainer = this.slider.parentElement.querySelector(".slider-dots");

        this.currentIndex = 0;
        this.autoSlideInterval = null;
        this.dots = [];
    }

    init() {
        this.createDots();
        this.bindEvents();
        this.updateSlidePosition();
        this.startAutoSlide();
        this.addHoverPause();
    }

    updateSlidePosition() {
        const offset = -this.currentIndex * this.slider.offsetWidth;

        this.track.style.transform = `translateX(${offset}px)`;
        this.track.style.transition = "transform 0.5s ease-in-out";

        this.updateDots();
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlidePosition();
    }

    prevSlide() {
        this.currentIndex =
            (this.currentIndex - 1 + this.slides.length) % this.slides.length;

        this.updateSlidePosition();
    }

    bindEvents() {
        this.nextBtn.addEventListener("click", () => this.nextSlide());

        this.prevBtn.addEventListener("click", () => this.prevSlide());

        window.addEventListener("resize", () => {
            this.updateSlidePosition();
        });
    }

    startAutoSlide() {
        this.stopAutoSlide();

        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 2000);
    }

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }

    addHoverPause() {
        this.slider.addEventListener("mouseenter", () => {
            this.stopAutoSlide();
        });

        this.slider.addEventListener("mouseleave", () => {
            this.startAutoSlide();
        });
    }

    createDots() {
        this.dotContainer.innerHTML = "";

        this.slides.forEach((_, index) => {
            const dot = document.createElement("span");

            dot.classList.add("dot");

            dot.addEventListener("click", () => {
                this.currentIndex = index;
                this.updateSlidePosition();
            });

            this.dotContainer.appendChild(dot);
            this.dots.push(dot);
        });
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === this.currentIndex);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const slider = new ImageSlider("#slider");
    slider.init();
});