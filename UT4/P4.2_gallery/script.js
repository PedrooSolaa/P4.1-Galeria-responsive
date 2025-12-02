// Datos de las imágenes (8 imágenes: 4 por fila, 2 filas)
const images = [
    {
        name: 'mountains-6865680_1280',
        title: 'Montañas'
    },
    {
        name: 'mountains-6865752_1280',
        title: 'Picos'
    },
    {
        name: 'mountains-7779007_1280',
        title: 'Valle'
    },
    {
        name: 'nature-6842159_1280',
        title: 'Naturaleza'
    },
    {
        name: 'nature-7897648_1280',
        title: 'Bosque'
    },
    {
        name: 'snow-7646952_1280',
        title: 'Nieve'
    },
    {
        name: 'trees-7646958_1280',
        title: 'Árboles'
    },
    {
        name: 'winter-4698763_1280',
        title: 'Invierno'
    }
];


function createGalleryItem(image) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    const basePath = '../resize_img/output-adv/';
    
   
    const picture = document.createElement('picture');
    
    
    const source2x = document.createElement('source');
    source2x.media = '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)';
    source2x.srcset = `
        ${basePath}${image.name}-medium-2x..jpg 1280w,
        ${basePath}${image.name}-large-2x..jpg 2560w
    `.trim();
    source2x.sizes = '(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw';
    
   
    const source1x = document.createElement('source');
    source1x.srcset = `
        ${basePath}${image.name}-medium-1x..jpg 640w,
        ${basePath}${image.name}-large-1x..jpg 1280w
    `.trim();
    source1x.sizes = '(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw';
    
   
    const img = document.createElement('img');
    img.src = `${basePath}${image.name}-medium-1x..jpg`;
    img.alt = image.title;
    img.loading = 'lazy';
    
    picture.appendChild(source2x);
    picture.appendChild(source1x);
    picture.appendChild(img);
    
    
    const imageContainer = document.createElement('div');
    imageContainer.className = 'gallery-item-image';
    imageContainer.appendChild(picture);
    
   
    const caption = document.createElement('div');
    caption.className = 'gallery-caption';
    caption.innerHTML = `
        <h3>${image.title}</h3>
    `;
    
    item.appendChild(imageContainer);
    item.appendChild(caption);
    
    
    item.addEventListener('click', () => openModal(image));
    
    return item;
}


function openModal(image) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const basePath = '../resize_img/output-adv/';
    
  
    const density = window.devicePixelRatio >= 2 ? '2x' : '1x';
    
    
    modalImage.src = `${basePath}${image.name}-xlarge-${density}..jpg`;
    
    
    modalImage.srcset = `
        ${basePath}${image.name}-large-${density}..jpg 1280w,
        ${basePath}${image.name}-xlarge-${density}..jpg 1920w
    `.trim();
    
    modalImage.sizes = '90vw';
    modalImage.alt = image.title;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}


function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}


document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    
    images.forEach(image => {
        const galleryItem = createGalleryItem(image);
        gallery.appendChild(galleryItem);
    });
    
 
    const modalClose = document.getElementById('modal-close');
    const modal = document.getElementById('modal');
    
    modalClose.addEventListener('click', closeModal);
    
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
   
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
});