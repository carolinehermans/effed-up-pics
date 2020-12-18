let input;
let img;
let imageLoaded = false;
let imgHalf1;
let imgHalf2;
let imgQuart1;
let imgQuart2;
let imgQuart3;
let imgQuart4;

let w;
let h;
let canvasW;
let canvasH;

function setup() {
  background(255);
  createCanvas(1200, 1200);
  canvasW = 1200;
  canvasH = 1200;

  input = createFileInput(handleFile);
  input.position(0, 0);
}

function draw() {
  if (img && imageLoaded) {
    background(255);
    if (img.width > canvasW - 100) {
      img.resize(canvasW, 0);
    }
    if (img.height > canvasH - 100) {
      img.resize(0, canvasH);
    }
    w = img.width;
    h = img.height;
    divideImage(img);
    imageLoaded = false;
  }
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = loadImage(file.data, () => {
      imageLoaded = true;
    });
  } else {
    img = null;
  }
}

function divideImage(img) {
  img.loadPixels();
  imgHalf1 = createImage(w, h / 2);
  imgHalf2 = createImage(w, h / 2);
  imgQuart1 = createImage(w / 2, h / 2);
  imgQuart2 = createImage(w / 2, h / 2);
  imgQuart3 = createImage(w / 2, h / 2);
  imgQuart4 = createImage(w / 2, h / 2);

  let div = 16;
  let colWidth = img.width / div;
  let rowHeight = img.height / div;
  let ctr = 0;

  for (let j = 0; j < img.height; j += rowHeight) {
    if (ctr % 2 == 0) {
      imgHalf1.set(0, j / 2, img.get(0, j, w, rowHeight));
    } else {
      imgHalf2.set(0, j / 2, img.get(0, j, w, rowHeight));
    }
    ctr++;
  }

  ctr = 0;
  for (let j = 0; j < img.width + colWidth; j += colWidth) {
    if (ctr % 2 == 0) {
      imgQuart1.set(
        (ctr * colWidth) / 2,
        0,
        imgHalf1.get(ctr * colWidth, 0, colWidth, img.height / 2)
      );
    } else {
      imgQuart2.set(
        ((ctr - 1) * colWidth) / 2,
        0,
        imgHalf1.get(ctr * colWidth, 0, colWidth, img.height / 2)
      );
    }
    ctr++;
  }

  ctr = 0;
  for (let j = 0; j < img.width + colWidth; j += colWidth) {
    if (ctr % 2 == 0) {
      imgQuart3.set(
        (ctr * colWidth) / 2,
        0,
        imgHalf2.get(ctr * colWidth, 0, colWidth, img.height / 2)
      );
    } else {
      imgQuart4.set(
        ((ctr - 1) * colWidth) / 2,
        0,
        imgHalf2.get(ctr * colWidth, 0, colWidth, img.height / 2)
      );
    }
    ctr++;
  }

  let m = 50;
  image(imgQuart1, 0 + m, 0 + m, w / 2, h / 4);
  image(imgQuart2, 0 + m, h / 4 + 2 * m, w / 2, h / 4);
  image(imgQuart3, w / 2 + 2 * m, 0 + m, w / 2, h / 4);
  image(imgQuart4, w / 2 + 2 * m, h / 4 + 2 * m, w / 2, h / 4);
}
