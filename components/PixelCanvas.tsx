
"use client"
import * as React from "react"

// Fix: Using 'declare global' instead of 'declare module' to properly register the 'pixel-canvas' custom element and avoid module resolution errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'pixel-canvas': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'data-gap'?: number;
        'data-speed'?: number;
        'data-colors'?: string;
        'data-variant'?: string;
      };
    }
  }
}

class Pixel {
  width: number; height: number; ctx: CanvasRenderingContext2D; x: number; y: number;
  color: string; speed: number; size: number; sizeStep: number; minSize: number;
  maxSizeInteger: number; maxSize: number; delay: number; counter: number;
  counterStep: number; isIdle: boolean; isReverse: boolean; isShimmer: boolean;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, x: number, y: number, color: string, speed: number, delay: number) {
    this.width = canvas.width; this.height = canvas.height; this.ctx = context;
    this.x = x; this.y = y; this.color = color;
    this.speed = (Math.random() * 0.8 + 0.1) * speed;
    this.size = 0; this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5; this.maxSizeInteger = 2;
    this.maxSize = Math.random() * (this.maxSizeInteger - this.minSize) + this.minSize;
    this.delay = delay; this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false; this.isReverse = false; this.isShimmer = false;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) { this.counter += this.counterStep; return; }
    if (this.size >= this.maxSize) { this.isShimmer = true; }
    if (this.isShimmer) { this.shimmer(); } else { this.size += this.sizeStep; }
    this.draw();
  }

  disappear() {
    this.isShimmer = false; this.counter = 0;
    if (this.size <= 0) { this.isIdle = true; return; } else { this.size -= 0.1; }
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) { this.isReverse = true; } else if (this.size <= this.minSize) { this.isReverse = false; }
    if (this.isReverse) { this.size -= this.speed; } else { this.size += this.speed; }
  }
}

class PixelCanvasElement extends HTMLElement {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private pixels: Pixel[] = [];
  private animation: number | null = null;
  private timeInterval: number = 1000 / 60;
  private timePrevious: number = performance.now();
  private _initialized: boolean = false;
  private _resizeObserver: ResizeObserver | null = null;
  private _parent: Element | null = null;

  constructor() {
    super();
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `:host { display: grid; inline-size: 100%; block-size: 100%; overflow: hidden; }`;
    shadow.appendChild(style);
    shadow.appendChild(this.canvas);
  }

  get colors() { return this.dataset.colors?.split(",") || ["#D4AF37", "#996515", "#FFD700"]; }
  get gap() { return Math.max(4, Math.min(50, Number(this.dataset.gap) || 5)); }
  get speed() { return Math.max(0, Math.min(100, Number(this.dataset.speed) || 35)) * 0.001; }
  get variant() { return this.dataset.variant || "default"; }

  connectedCallback() {
    if (this._initialized) return;
    this._initialized = true;
    this._parent = this.parentElement;
    requestAnimationFrame(() => {
      this.handleResize();
      this._resizeObserver = new ResizeObserver(() => requestAnimationFrame(() => this.handleResize()));
      this._resizeObserver.observe(this);
    });
    this._parent?.addEventListener("mouseenter", () => this.handleAnimation("appear"));
    this._parent?.addEventListener("mouseleave", () => this.handleAnimation("disappear"));
  }

  disconnectedCallback() {
    this._resizeObserver?.disconnect();
    if (this.animation) cancelAnimationFrame(this.animation);
  }

  handleResize() {
    if (!this.ctx) return;
    const rect = this.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
    this.ctx.scale(dpr, dpr);
    this.createPixels();
  }

  createPixels() {
    if (!this.ctx) return;
    this.pixels = [];
    for (let x = 0; x < this.canvas.width; x += this.gap) {
      for (let y = 0; y < this.canvas.height; y += this.gap) {
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const delay = this.variant === "icon" ? Math.sqrt(Math.pow(x - this.canvas.width/2, 2)) : Math.sqrt(Math.pow(x, 2) + Math.pow(this.canvas.height - y, 2));
        this.pixels.push(new Pixel(this.canvas, this.ctx, x, y, color, this.speed, delay));
      }
    }
  }

  handleAnimation(name: "appear" | "disappear") {
    if (this.animation) cancelAnimationFrame(this.animation);
    const animate = () => {
      this.animation = requestAnimationFrame(animate);
      const timeNow = performance.now();
      if (timeNow - this.timePrevious < this.timeInterval) return;
      this.timePrevious = timeNow;
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      let allIdle = true;
      for (const pixel of this.pixels) { pixel[name](); if (!pixel.isIdle) allIdle = false; }
      if (allIdle) { cancelAnimationFrame(this.animation!); this.animation = null; }
    };
    animate();
  }
}

if (typeof window !== "undefined" && !customElements.get("pixel-canvas")) {
  customElements.define("pixel-canvas", PixelCanvasElement);
}

// Fix: Correctly define prop types for the PixelCanvas wrapper component
export const PixelCanvas = ({ gap = 5, speed = 35, colors = ["#D4AF37", "#996515", "#FFD700"], variant = "default" }: { gap?: number; speed?: number; colors?: string[]; variant?: string }) => {
  return (
    <pixel-canvas
      data-gap={gap}
      data-speed={speed}
      data-colors={colors.join(",")}
      data-variant={variant}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', width: '100%', height: '100%' }}
    />
  );
};
