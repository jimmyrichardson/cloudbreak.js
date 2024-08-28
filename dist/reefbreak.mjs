class s {
  constructor(t = "[data-reefbreak]", e = {
    intensity: 1,
    speed: 1,
    animate: !0
  }) {
    this.NS = "http://www.w3.org/2000/svg", this.svg = document.createElementNS(this.NS, "svg"), this.defs = document.createElementNS(this.NS, "defs"), this.filter = document.createElementNS(this.NS, "filter"), this.blur = document.createElementNS(this.NS, "feGaussianBlur"), this.colorMatrix = document.createElementNS(this.NS, "feColorMatrix"), this.turbulence = document.createElementNS(this.NS, "feTurbulence"), this.displacement = document.createElementNS(this.NS, "feDisplacementMap"), this.composite = document.createElementNS(this.NS, "feComposite"), this.config = {
      blur: 2,
      baseFrequency: 0.0125,
      scale: 50
    }, this.init(t, e);
  }
  init(t, e) {
    this.createElements(), this.initBlur(), this.initColorMatrix(), this.initTurbulence(), this.initDisplacement(), this.initComposite(), this.bindFilter(t), e.animate && this.animate();
  }
  createElements() {
    this.svg.appendChild(this.defs), this.defs.appendChild(this.filter), this.filter.appendChild(this.blur), this.filter.appendChild(this.colorMatrix), this.filter.appendChild(this.turbulence), this.filter.appendChild(this.displacement), this.filter.appendChild(this.composite), this.svg.id = "reefbreak-svg", this.filter.id = "reefbreak", document.body.appendChild(this.svg);
  }
  initBlur() {
    this.blur.setAttribute("in", "SourceGraphic"), this.blur.setAttribute("result", "blur"), this.blur.setAttribute("stdDeviation", this.config.blur);
  }
  initColorMatrix() {
    this.colorMatrix.setAttribute("in", "blur"), this.colorMatrix.setAttribute("type", "matrix"), this.colorMatrix.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 1 0 1 0 0 0 0 0 12 -8"), this.colorMatrix.setAttribute("result", "goo");
  }
  initTurbulence() {
    this.turbulence.setAttribute("type", "fractalNoise"), this.turbulence.setAttribute("numOctaves", "1"), this.turbulence.setAttribute("seed", "1"), this.turbulence.setAttribute("result", "noise"), this.turbulence.setAttribute("baseFrequency", this.config.baseFrequency);
  }
  initDisplacement() {
    this.displacement.setAttribute("in", "goo"), this.displacement.setAttribute("in2", "noise"), this.displacement.setAttribute("result", "displacement"), this.displacement.setAttribute("scale", this.config.scale);
  }
  initComposite() {
    this.composite.setAttribute("in", "SourceGraphic"), this.composite.setAttribute("in2", "displacement"), this.composite.setAttribute("operator", "atop");
  }
  animate() {
    let t = 0;
    const e = () => {
      t += 5e-3, this.blur.setAttribute("stdDeviation", this.config.blur + Math.sin(t) * 1), this.turbulence.setAttribute("baseFrequency", this.config.baseFrequency + Math.sin(t) * 0.01), this.displacement.setAttribute("scale", this.config.scale + Math.sin(t) * 10), requestAnimationFrame(e);
    };
    e();
  }
  bindFilter(t) {
    document.querySelectorAll(t).forEach((e) => {
      e.style.filter = "url('#reefbreak')", e.style.webkitFilter = "url('#reefbreak')";
    });
  }
}
export {
  s as default
};
