// Navbar visibility toggle
const primaryNav = document.querySelector(".primary-nav");
const navToggle = document.querySelector(".mobile-nav-toggle");
const navLinks = document.querySelectorAll(".nav-link");

function toggleNav() {
	const visibility = primaryNav.getAttribute("data-visible") === "false";
	primaryNav.setAttribute("data-visible", visibility);
	navToggle.setAttribute("aria-expanded", visibility);
}

navToggle.addEventListener("click", toggleNav);

navLinks.forEach((link) => link.addEventListener("click", toggleNav));

// Adds and removes the "active" class
const listItems = document.querySelectorAll(".target");

function setActiveClass() {
	if (document.querySelector(".active") != null) {
		document.querySelector(".active").classList.remove("active");
	}
	this.classList.add("active");
}

listItems.forEach((item) => {
	item.addEventListener("click", setActiveClass);
});

// Stops animations and transitions on page resize
let resizeTimer;
window.addEventListener("resize", () => {
	document.body.classList.add("resize-animation-stopper");
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(() => {
		document.body.classList.remove("resize-animation-stopper");
	}, 400);
});

// Typewriter effect
var TxtType = function (el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = "";
	this.tick();
	this.isDeleting = false;
};

TxtType.prototype.tick = function () {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

	var that = this;
	var delta = 200 - Math.random() * 100;

	if (this.isDeleting) {
		delta /= 2;
	}

	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === "") {
		this.isDeleting = false;
		this.loopNum++;
		delta = 500;
	}

	setTimeout(function () {
		that.tick();
	}, delta);
};

window.onload = function () {
	var elements = document.getElementsByClassName("typewrite");
	for (var i = 0; i < elements.length; i++) {
		var toRotate = elements[i].getAttribute("data-type");
		var period = elements[i].getAttribute("data-period");
		if (toRotate) {
			new TxtType(elements[i], JSON.parse(toRotate), period);
		}
	}

	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
	document.body.appendChild(css);
};
