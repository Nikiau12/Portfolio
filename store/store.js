    document.getElementById('year').textContent = new Date().getFullYear();

    function euro(n){
      if (typeof n !== "number") return "€—";
      return "€" + n.toFixed(0);
    }

    function cloneImages(arr){
      return Array.isArray(arr) ? [...arr] : [];
    }

    function withUrl(finish, url){
      return {
        key: finish.key,
        label: finish.label,
        price: finish.price,
        url,
        images: cloneImages(finish.images)
      };
    }

    function createSizeConfig({ label, sizeText, finishes }){
      return { label, sizeText, finishes };
    }

    function createProductSizes(largeConfig, mediumConfig, postcardConfig){
      return {
        postcard: createSizeConfig(postcardConfig),
        medium: createSizeConfig(mediumConfig),
        large: createSizeConfig(largeConfig)
      };
    }

    function getAllPricesFromProduct(productId){
      const info = PRODUCT_INFO?.[productId];
      const sizes = info?.sizes || {};
      return Object.values(sizes)
        .flatMap(size => Array.isArray(size.finishes) ? size.finishes : [])
        .map(f => Number(f.price))
        .filter(n => Number.isFinite(n));
    }

    function euroRangeFromProduct(productId){
      const prices = getAllPricesFromProduct(productId);
      if (!prices.length) return "€—";
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? euro(min) : `${euro(min)}–${euro(max)}`;
    }

    // ==========================
    // BASE FINISHES (current = LARGE)
    // ==========================
    const LARGE_FINISHES = {
      brittany: [
        { key:"unframed", label:"Unframed", price:70,  url:"https://buy.stripe.com/dRmaEQ9f6aF7dcNbUWasg0O", images:["/img/optimized/055.jpg"] },
        { key:"black",    label:"Custom Black Frame", price:300, url:"https://buy.stripe.com/8x26oA3UM5kNgoZ0ceasg0c", images:["/img/optimized/056.jpg"] },
        { key:"white",    label:"Custom White Frame", price:300, url:"https://buy.stripe.com/14A6oAezq7sV7St8IKasg0d", images:["/img/optimized/054.jpg"] }
      ],

      new5: [
        { key:"unframed", label:"Unframed", price:70,  url:"https://buy.stripe.com/00w3co1ME5kN2y92kmasg0e", images:["/img/optimized/053.jpg"] }
      ],

      new7: [
        { key:"unframed", label:"Unframed", price:100, url:"https://buy.stripe.com/28E14g8b2dRjfkV8IKasg0k", images:["/img/optimized/005.jpg"] },
        { key:"black",    label:"Custom Black Frame", price:400, url:"https://buy.stripe.com/9B69AMajaeVn1u58IKasg0l", images:["/img/optimized/003.jpg"] },
        { key:"white",    label:"Custom White Frame", price:400, url:"https://buy.stripe.com/bJe00c1MEbJb0q14suasg0m", images:["/img/optimized/004.jpg"] }
      ],
      new8: [
        { key:"unframed", label:"Unframed", price:100, url:"https://buy.stripe.com/aFa14g2QI3cFgoZbUWasg0n", images:["/img/optimized/008.jpg"] },
        { key:"black",    label:"Custom Black Frame", price:400, url:"https://buy.stripe.com/cNiaEQ4YQ00tegR6ACasg0o", images:["/img/optimized/006.jpg"] },
        { key:"white",    label:"Custom White Frame", price:400, url:"https://buy.stripe.com/4gM28k2QI4gJ2y91giasg0p", images:["/img/optimized/007.jpg"] }
      ],
      new9: [
        { key:"unframed", label:"Unframed", price:100, url:"https://buy.stripe.com/bJe14gbnefZrfkV0ceasg0q", images:["/img/optimized/011.jpg"] },
        { key:"black",    label:"Custom Black Frame", price:400, url:"https://buy.stripe.com/3cIbIU3UM7sV0q11giasg0r", images:["/img/optimized/009.jpg"] },
        { key:"white",    label:"Custom White Frame", price:400, url:"https://buy.stripe.com/00wcMY76Y14x6Opf78asg0s", images:["/img/optimized/010.jpg"] }
      ],
      new10: [
        { key:"unframed", label:"Unframed", price:100, url:"https://buy.stripe.com/7sYaEQcricNf2y91giasg0t", images:["/img/optimized/002.jpg"] },
        { key:"black",    label:"Custom Black Frame", price:400, url:"https://buy.stripe.com/14A00c8b29B36Op5wyasg0u", images:["/img/optimized/001.jpg"] },
        { key:"white",    label:"Custom White Frame", price:400, url:"https://buy.stripe.com/aFa6oAdvmeVna0BbUWasg0v", images:["/img/optimized/002.jpg"] }
      ]
    };

    // ==========================
    // PRODUCT DATA
    // ==========================
    const PRODUCT_INFO = {
      brittany: {
        meta: "NIKITA KOTRELEV",
        title: "France, Brittany",
        detailsHref: "/store/#brittany",
        sizes: createProductSizes(
          {
            label: "Large",
            sizeText: "74 × 51,3 cm image size (80 × 60 cm paper/frame)",
            finishes: LARGE_FINISHES.brittany
          },
          {
            label: "Medium",
            sizeText: "38 × 24,1 cm image size (40 × 30 cm)",
            finishes: [
              withUrl({ ...LARGE_FINISHES.brittany[0], price:55 }, "https://buy.stripe.com/dRmcMYfDu9B3b4F0ceasg0P"),
              withUrl({ ...LARGE_FINISHES.brittany[1], price:220 }, "https://buy.stripe.com/6oU9AMbne28BgoZ4suasg0M"),
              withUrl({ ...LARGE_FINISHES.brittany[2], price:220 }, "https://buy.stripe.com/cNi8wI76Y3cF0q14suasg0N")
            ]
          },
          {
            label: "Postcard",
            sizeText: "11,1 × 7,3 cm",
            finishes: [
              withUrl({ ...LARGE_FINISHES.brittany[0], label:"Postcard", price:20 }, "https://buy.stripe.com/3cI7sE2QI9B3dcNcZ0asg0Q")
            ]
          }
        )
      },

      new5: {
        meta: "NIKITA KOTRELEV",
        title: "Russia, Moscow Kremlin",
        detailsHref: "/store/#new5",
        sizes: {
          large: {
            label: "Large",
            sizeText: "31,7 × 16,9 cm image size (33,7 × 21,9 cm paper/frame)",
            finishes: LARGE_FINISHES.new5
          }
        }
      },

      new7: {
        meta: "NIKITA KOTRELEV",
        title: "Football pitch. Kathmandu, Nepal, 2026",
        detailsHref: "/store/#new7",
        sizes: createProductSizes(
          {
            label: "Large",
            sizeText: "100 × 70 cm (101.8 × 71.8 cm framed)",
            finishes: LARGE_FINISHES.new7
          },
          {
            label: "Medium",
            sizeText: "70 × 50 cm (71.8 × 51.8 cm framed)",
            finishes: [
              withUrl({ ...LARGE_FINISHES.new7[0], price:70 }, "https://buy.stripe.com/5kQ4gs9f6cNf4Gh1giasg0I"),
              withUrl({ ...LARGE_FINISHES.new7[1], price:260 }, "https://buy.stripe.com/28E9AMezq7sVdcN4suasg0K"),
              withUrl({ ...LARGE_FINISHES.new7[2], price:260 }, "https://buy.stripe.com/fZu8wI1ME6oR7St4suasg0L")
            ]
          },
          {
            label: "Postcard",
            sizeText: "10 × 15 cm",
            finishes: [
              withUrl({ ...LARGE_FINISHES.new7[0], label:"Postcard", price:20 }, "https://buy.stripe.com/dRmbIUfDueVn4Gh6ACasg0J")
            ]
          }
        )
      },

      new8: {
        meta: "NIKITA KOTRELEV",
        title: "A Buddhist monk with a rug. Kathmandu, Nepal, 2026",
        detailsHref: "/store/#new8",
        sizes: createProductSizes(
          {
            label: "Large",
            sizeText: "70 × 100 cm (71.8 × 101.8 cm framed)",
            finishes: LARGE_FINISHES.new8
          },
          {
            label: "Medium",
            sizeText: "50 × 70 cm (51.8 × 71.8 cm framed)",
            finishes: [
              withUrl({ ...LARGE_FINISHES.new8[0], price:70 }, "https://buy.stripe.com/dRmfZa1MEaF78Wx6ACasg0F"),
              withUrl({ ...LARGE_FINISHES.new8[1], price:260 }, "https://buy.stripe.com/5kQ00c0IAbJbgoZ6ACasg0G"),
              withUrl({ ...LARGE_FINISHES.new8[2], price:260 }, "https://buy.stripe.com/aFa5kwfDu3cFb4FaQSasg0H")
            ]
          },
          {
            label: "Postcard",
            sizeText: "10 × 15 cm",
            finishes: [
              withUrl({ ...LARGE_FINISHES.new8[0], label:"Postcard", price:20 }, "https://buy.stripe.com/00w6oAbnecNf1u55wyasg0E")
            ]
          }
        )
      },

      new9: {
        meta: "NIKITA KOTRELEV",
        title: "Builders balancing bricks on their heads. Varanasi, India, 2026",
        detailsHref: "/store/#new9",
        sizes: createProductSizes(
          {
            label: "Large",
            sizeText: "70 × 100 cm (71.8 × 101.8 cm framed)",
            finishes: LARGE_FINISHES.new9
          },
          {
            label: "Medium",
            sizeText: "50 × 70 cm (51.8 × 71.8 cm framed)",
            finishes: [
              withUrl({ ...LARGE_FINISHES.new9[0], price:70 }, "https://buy.stripe.com/28EbIU76Y7sVegR9MOasg0A"),
              withUrl({ ...LARGE_FINISHES.new9[1], price:260 }, "https://buy.stripe.com/4gMaEQ3UM3cF4Ghgbcasg0C"),
              withUrl({ ...LARGE_FINISHES.new9[2], price:260 }, "https://buy.stripe.com/3cI9AMfDu6oRa0B5wyasg0D")
            ]
          },
          {
            label: "Postcard",
            sizeText: "10 × 15 cm",
            finishes: [
              withUrl({ ...LARGE_FINISHES.new9[0], label:"Postcard", price:20 }, "https://buy.stripe.com/6oUbIU4YQ00t6Ope34asg0B")
            ]
          }
        )
      },

      new10: {
        meta: "NIKITA KOTRELEV",
        title: "Georgia, Batumi, 2025",
        detailsHref: "/store/#new10",
        sizes: createProductSizes(
          {
            label: "Large",
            sizeText: "70 × 100 cm (71.8 × 101.8 cm framed)",
            finishes: LARGE_FINISHES.new10
          },
          {
            label: "Medium",
            sizeText: "50 × 70 cm (51.8 × 71.8 cm framed)",
            finishes: [
              withUrl({ ...LARGE_FINISHES.new10[0], price:70 }, "https://buy.stripe.com/eVq5kw1MEbJbc8J6ACasg0x"),
              withUrl({ ...LARGE_FINISHES.new10[1], price:260 }, "https://buy.stripe.com/4gM7sE62U4gJ0q1cZ0asg0y"),
              withUrl({ ...LARGE_FINISHES.new10[2], price:260 }, "https://buy.stripe.com/28E3cofDudRjb4FbUWasg0z")
            ]
          },
          {
            label: "Postcard",
            sizeText: "10 × 15 cm",
            finishes: [
              withUrl({ ...LARGE_FINISHES.new10[0], label:"Postcard", price:20 }, "https://buy.stripe.com/7sY4gs8b29B3b4F6ACasg0w")
            ]
          }
        )
      }
    };

    // ==========================
    // CARD PRICES
    // ==========================
    document.querySelectorAll('.product').forEach((card)=>{
      const productId = card.dataset.product;
      const priceEl = card.querySelector('[data-price]');
      if (priceEl) priceEl.textContent = euroRangeFromProduct(productId);
    });

    // ===== Lightbox preview =====
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    const lbCap = document.getElementById('lb-cap');

    function storeAssetUrl(src){
      if(!src) return "";
      if (/^(https?:|data:|blob:|\/)/i.test(src)) return src;
      if (src.startsWith("img/")) return `/${src}`;
      return src;
    }

    function openLb(src, cap){
      lbImg.src = storeAssetUrl(src);
      lbImg.alt = cap || "Preview";
      lbCap.textContent = cap || "";
      lb.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    }
    function closeLb(){
      lb.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
      lbImg.src = "";
    }

    document.addEventListener('click', (e)=>{
      const t = e.target.closest('.thumb');
      if(!t) return;

      const card = t.closest('.product');
      const productId = card?.dataset?.product;

      if (window.matchMedia("(max-width: 820px)").matches && productId){
        openQVById(productId);
        return;
      }

      openLb(t.dataset.lightbox || t.querySelector('img')?.src, t.dataset.caption || "");
    });

    lbImg.addEventListener('click', (e)=>{ e.stopPropagation(); closeLb(); });
    lb.addEventListener('click', (e)=>{ if(e.target === lb) closeLb(); });

    // ===== Quick View Modal =====
    const qv = document.getElementById('qv');
    const qvImg = document.getElementById('qv-img');
    const qvMeta = document.getElementById('qv-meta');
    const qvTitle = document.getElementById('qv-title');
    const qvPrice = document.getElementById('qv-price');
    const qvBuy = document.getElementById('qv-buy');
    const qvClose = document.getElementById('qv-close');
    const qvThumbs = document.getElementById('qv-thumbs');
    const qvDetails = document.getElementById('qv-details');
    const qvSwatches = document.getElementById('qv-swatches');
    const qvFinishLabel = document.getElementById('qv-finish-label');
    const qvSizeText = document.getElementById('qv-size-text');
    const qvSizeOptions = document.getElementById('qv-size-options');

    const productOrder = Array.from(document.querySelectorAll('.product')).map(p => p.dataset.product);
    let currentProductIndex = 0;
    let currentImageIndex = 0;
    let currentFinishKey = "unframed";
    let currentSizeKey = "large";

    function getInfo(id){
      return PRODUCT_INFO?.[id] || {};
    }

    function getSizes(id){
      return getInfo(id).sizes || {};
    }

    function getCurrentSize(id){
      return getSizes(id)[currentSizeKey] || null;
    }

    function getCurrentFinish(id){
      const size = getCurrentSize(id);
      return (size?.finishes || []).find(f => f.key === currentFinishKey) || size?.finishes?.[0] || null;
    }

    function euroFromSelection(id){
      const fin = getCurrentFinish(id);
      return (typeof fin?.price === "number") ? fin.price : null;
    }

    let qvSwapToken = 0;
    function setQVImage(src){
      const token = ++qvSwapToken;
      const imageSrc = storeAssetUrl(src);

      if(!imageSrc){
        qvImg.classList.remove("is-switching");
        qvImg.src = "";
        qvImg.alt = qvTitle.textContent || "Preview";
        return;
      }

      qvImg.classList.add("is-switching");
      qvImg.alt = qvTitle.textContent || "Preview";

      const finishSwap = () => {
        if(token !== qvSwapToken) return;
        enableAutoTrimIn(qv);
        qvImg.classList.remove("is-switching");
      };

      qvImg.onload = finishSwap;
      qvImg.onerror = finishSwap;
      qvImg.src = imageSrc;

      if (qvImg.complete) finishSwap();
    }

    function renderThumbs(images){
      qvThumbs.innerHTML = "";
      images.forEach((src, i)=>{
        if(!src) return;
        const b = document.createElement('button');
        b.type = "button";
        b.className = "qv__t";
        b.setAttribute('aria-current', i === currentImageIndex ? "true" : "false");
        b.innerHTML = `<img data-autotrim="1" src="${storeAssetUrl(src)}" alt="">`;
        b.addEventListener('click', ()=>{
          currentImageIndex = i;
          setQVImage(images[currentImageIndex]);
          renderThumbs(images);
        });
        qvThumbs.appendChild(b);
        enableAutoTrimIn(b);
      });
    }

    function renderSwatches(id){
      const size = getCurrentSize(id);
      const finishes = size?.finishes || [];

      qvSwatches.innerHTML = "";
      finishes.forEach((f)=>{
        const b = document.createElement('button');
        b.type = "button";

        let cls = "qv__sw";
        if (f.key === "white") cls += " qv__sw--white";
        if (f.key === "black") cls += " qv__sw--black";
        if (f.key === "unframed" || f.label === "Postcard") cls += " qv__sw--unframed";
        b.className = cls;

        b.setAttribute('aria-current', f.key === currentFinishKey ? "true" : "false");
        b.innerHTML = `<div class="qv__corner"></div>`;
        b.addEventListener('click', ()=>{
          currentFinishKey = f.key;
          currentImageIndex = 0;
          applySelection(id);
          renderSwatches(id);
        });
        qvSwatches.appendChild(b);
      });
    }

    function renderSizeOptions(id){
      const sizes = getSizes(id);
      qvSizeOptions.innerHTML = "";

      ["postcard", "medium", "large"].forEach((sizeKey)=>{
        const size = sizes[sizeKey];
        if(!size) return;

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "qv__size-btn";
        btn.setAttribute("aria-current", sizeKey === currentSizeKey ? "true" : "false");
        btn.innerHTML = `<strong>${size.label}</strong><span>${size.sizeText}</span>`;
        btn.addEventListener("click", ()=>{
          currentSizeKey = sizeKey;
          currentImageIndex = 0;

          const currentSize = getCurrentSize(id);
          const finishExists = (currentSize?.finishes || []).some(f => f.key === currentFinishKey);
          if (!finishExists){
            currentFinishKey = currentSize?.finishes?.[0]?.key || "unframed";
          }

          applySelection(id);
          renderSizeOptions(id);
          renderSwatches(id);
        });

        qvSizeOptions.appendChild(btn);
      });
    }

    function applySelection(id){
      const size = getCurrentSize(id);
      const fin = getCurrentFinish(id);
      const images = (fin?.images && fin.images.length) ? fin.images.filter(Boolean) : [];

      qv.dataset.finish = currentFinishKey;
      qv.dataset.size = currentSizeKey;

      qvFinishLabel.textContent = fin?.label || "—";
      qvSizeText.textContent = size?.sizeText || "—";

      renderThumbs(images);
      setQVImage(images[currentImageIndex] || "");

      const p = euroFromSelection(id);
      qvPrice.textContent = (typeof p === "number") ? euro(p) : "€—";

      const url = fin?.url || "";
      qvBuy.disabled = !url || url.includes("PASTE_STRIPE_");
      qvBuy.dataset.url = url;

      enableAutoTrimIn(qv);
    }

    function openQVById(productId){
      currentProductIndex = Math.max(0, productOrder.indexOf(productId));
      currentImageIndex = 0;
      currentFinishKey = "unframed";
      currentSizeKey = "large";

      const info = getInfo(productId);
      if (typeof window.trackPortfolioEvent === "function") {
        window.trackPortfolioEvent("store_view_click", {
          product_id: productId,
          product_name: info.title || productId
        });
      }
      qvMeta.textContent = info.meta || "NIKITA KOTRELEV";
      qvTitle.textContent = info.title || productId;
      qvDetails.href = info.detailsHref || `/store/#${productId}`;

      qv.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';

      renderSizeOptions(productId);
      renderSwatches(productId);
      applySelection(productId);
      enableAutoTrimIn(document);
    }

    function closeQV(){
      qv.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
      qvImg.src = "";
      qvThumbs.innerHTML = "";
      qvSwatches.innerHTML = "";
      qvSizeOptions.innerHTML = "";
      delete qv.dataset.finish;
      delete qv.dataset.size;
    }

    document.addEventListener('click', (e)=>{
      const btn = e.target.closest('[data-qv]');
      if(!btn) return;
      const card = btn.closest('.product');
      if(!card) return;
      openQVById(card.dataset.product);
    });

    qvClose.addEventListener('click', closeQV);
    qv.addEventListener('click', (e)=>{ if(e.target === qv) closeQV(); });

    qvBuy.addEventListener('click', ()=>{
      const url = qvBuy.dataset.url;
      if(!url) return;
      if (typeof window.trackPortfolioEvent === "function") {
        window.trackPortfolioEvent("stripe_checkout_click", {
          product_id: productOrder[currentProductIndex] || "",
          product_name: qvTitle.textContent || "",
          link_url: url
        });
      }
      window.location.href = url;
    });

    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape'){
        if (qv.getAttribute('aria-hidden') === 'false') closeQV();
        else closeLb();
      }
    });

    // =======================
    // AUTO-TRIM WHITE MARGINS
    // =======================
    const TRIM_CACHE = new Map();
    const WHITE_T = 248;

    function isWhite(r,g,b,a){
      if (a < 10) return true;
      return r >= WHITE_T && g >= WHITE_T && b >= WHITE_T;
    }

    function computeTrimFromImage(imgEl){
      const src = imgEl.currentSrc || imgEl.src;
      if(!src) return;

      if (TRIM_CACHE.has(src)){
        const t = TRIM_CACHE.get(src);
        imgEl.classList.add("autotrim");
        imgEl.style.transform = `translate(${t.tx}%, ${t.ty}%) scale(${t.scale})`;
        return;
      }

      const probe = new Image();
      probe.decoding = "async";
      probe.onload = () => {
        const w = probe.naturalWidth;
        const h = probe.naturalHeight;

        const maxSide = 420;
        const s = Math.min(1, maxSide / Math.max(w, h));
        const cw = Math.max(1, Math.round(w * s));
        const ch = Math.max(1, Math.round(h * s));

        const c = document.createElement("canvas");
        c.width = cw; c.height = ch;
        const ctx = c.getContext("2d", { willReadFrequently:true });
        ctx.drawImage(probe, 0, 0, cw, ch);

        const { data } = ctx.getImageData(0, 0, cw, ch);

        let minX = cw, minY = ch, maxX = 0, maxY = 0;
        let found = false;

        for (let y=0; y<ch; y++){
          for (let x=0; x<cw; x++){
            const i = (y*cw + x) * 4;
            const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
            if (!isWhite(r,g,b,a)){
              found = true;
              if (x < minX) minX = x;
              if (y < minY) minY = y;
              if (x > maxX) maxX = x;
              if (y > maxY) maxY = y;
            }
          }
        }

        if (!found){
          TRIM_CACHE.set(src, { tx:0, ty:0, scale:1 });
          imgEl.classList.add("autotrim");
          imgEl.style.transform = `translate(0%, 0%) scale(1)`;
          return;
        }

        const boxW = (maxX - minX + 1);
        const boxH = (maxY - minY + 1);
        const rW = boxW / cw;
        const rH = boxH / ch;

        let scale = 1 / Math.max(rW, rH);
        scale = Math.min(scale, 1.35);

        const cx = (minX + maxX) / 2 / cw;
        const cy = (minY + maxY) / 2 / ch;
        const tx = (0.5 - cx) * 100;
        const ty = (0.5 - cy) * 100;

        const t = { tx, ty, scale };
        TRIM_CACHE.set(src, t);

        imgEl.classList.add("autotrim");
        imgEl.style.transform = `translate(${tx}%, ${ty}%) scale(${scale})`;
      };

      probe.src = src;
    }

    function enableAutoTrimIn(root=document){
      root.querySelectorAll('img[data-autotrim="1"]').forEach(img=>{
        img.classList.add("autotrim");
        if (img.complete) computeTrimFromImage(img);
        else img.addEventListener("load", ()=>computeTrimFromImage(img), { once:true });
      });
    }

    enableAutoTrimIn(document);
