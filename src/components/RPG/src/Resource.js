class Resources {
  constructor() {
    // Everything we plan to download
    this.toLoad = {
      water: "/sprites/water.png",
      phase0: "/sprites/phase0.png",
      phase1: "/sprites/phase1.png",
      phase2: "/sprites/phase2.png",
      phase3: "/sprites/phase3.png",
      hero: "/sprites/hero-sheet.png",
      male: "/sprites/character-male.png",
      female: "/sprites/character-female.png",
      shadow: "/sprites/shadow.png",
      rod: "/sprites/rod.png",
      dialog: "/sprites/dialog.png",
      npc: "/sprites/npc.png",
    };

    // A bucket to keep all of our images
    this.images = {};

    // Load each image
    Object.keys(this.toLoad).forEach(key => {
      const img = new Image();
      img.src = this.toLoad[key];
      this.images[key] = {
        image: img,
        isLoaded: false
      }
      img.onload = () => {
        this.images[key].isLoaded = true;
      }
    })
  }
}

// Create one instance for the whole app to use
export const resources = new Resources();
