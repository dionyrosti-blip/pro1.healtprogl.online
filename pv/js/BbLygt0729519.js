
      (function() {
        try {
          const atomiStaticPageMeta = {"pageId":"v7qh7HxRDGEcoFil0sNU","pageName":"DTC - Linfozen","pageDomain":"www.linfozen.store"};
          const ATOMI_PLATFORM_NOTIFY_URL = "https://apido.atomicat-api.com/platform/notify/s/fe";

          function atomiSerializeError(error) {
            try {
              if (!error) return { message: "Unknown error" };
              if (typeof error === "string") return { message: error };
              if (error instanceof Error) {
                return {
                  name: error.name,
                  message: error.message,
                  stack: error.stack,
                };
              }
              return {
                message: error?.message || "Non-Error exception",
                raw: JSON.stringify(error),
              };
            } catch (serializationError) {
              return {
                message: "Failed to serialize error",
                serializationError: serializationError?.message,
              };
            }
          }

          function atomiReportError(error, extra = {}) {
            try {
              const payload = {
                domain: window?.location?.hostname || atomiStaticPageMeta?.pageDomain || "",
                pageUrl: window?.location?.href || "",
                pagePath: window?.location?.pathname || "",
                referrer: document?.referrer || "",
                userAgent: navigator?.userAgent || "",
                language: navigator?.language || "",
                viewport: {
                  width: window?.innerWidth,
                  height: window?.innerHeight,
                },
                timestamp: new Date().toISOString(),
                pageMeta: atomiStaticPageMeta,
                error: atomiSerializeError(error),
                extra,
              };

              const payloadString = JSON.stringify(payload);
              if (navigator?.sendBeacon) {
                const blob = new Blob([payloadString], { type: "text/plain;charset=UTF-8" });
                navigator.sendBeacon(ATOMI_PLATFORM_NOTIFY_URL, blob);
                return;
              }

              fetch(ATOMI_PLATFORM_NOTIFY_URL, {
                method: "POST",
                mode: "no-cors",
                keepalive: true,
                headers: {
                  "Content-Type": "text/plain;charset=UTF-8",
                },
                body: payloadString,
              }).catch(() => {});
            } catch (reportingError) {
              console.log(reportingError);
            }
          }

          if (typeof window !== "undefined") {
            window.atomiReportError = atomiReportError;
          }
        } catch (error) {
          console.log(error);
        }
      })();
    
      function atomiNormalizeRevealEntries(items) {
        if (!items || !items.length) return [];
        const def = 100;
        return items.map(function (entry) {
          if (typeof entry === "string") {
            var s = entry.trim();
            return s ? { value: s, showAtPercent: def } : null;
          }
          if (entry && typeof entry === "object") {
            var v = entry.value != null ? entry.value : (entry.id != null ? entry.id : entry.className);
            v = v != null ? String(v).trim() : "";
            if (!v) return null;
            var p = entry.showAtPercent != null ? Number(entry.showAtPercent) : def;
            if (isNaN(p)) p = def;
            p = Math.max(0, Math.min(100, p));
            return { value: v, showAtPercent: p };
          }
          return null;
        }).filter(Boolean);
      }
      function atomiShowItems({items}) {
      try {
        (items || []).forEach((item) => {
          const key = typeof item === "string" ? item : (item && (item.value != null ? item.value : (item.id != null ? item.id : item.className)));
          if (key == null || key === "") return;
          const token = String(key).trim();
          if (!token) return;
          const hiddenItem = [...document.querySelectorAll(`#${token}`), ...document.querySelectorAll(`.${token}`)];
          console.log("hiddenItem", hiddenItem)
          if (hiddenItem?.length > 0) {
            hiddenItem.forEach(item => item.classList.remove("atomicat-delay"));
          }
        })
      } catch (error) {
        console.log(error);
      }
      }
    
    (function() {
      try {
        const setPanel = (title, open) => {
          title.classList.toggle("a-ac-t-active", open);
          const content = title.nextElementSibling;
          if (content) content.classList.toggle("a-c-inactive", !open);
          const wrap = title.childNodes[1];
          wrap?.childNodes[0]?.classList.toggle("atomicat-hidden", !open);
          wrap?.childNodes[1]?.classList.toggle("atomicat-hidden", open);
          const unfold = content?.nextElementSibling;
          if (unfold) unfold.classList.toggle("atomicat-hidden", !open);
        };
        document.querySelectorAll(".a-ac-t").forEach((title) => {
          title.addEventListener("click", () => {
            const open = !title.classList.contains("a-ac-t-active");
            const container = title.closest(".accordion, .a-accordion");
            const titles = container?.querySelectorAll(".a-ac-t") ?? document.querySelectorAll(".a-ac-t");
            titles.forEach((t) => setPanel(t, t === title && open));
          });
        });
      } catch (e) {}
    })();
      (function() {
        const progressbarList = [{"compKey":"537142fe-792d-4e44-a35c-51d790a80720","misc":{"type":"progressbar","hidePercentage":true,"percentageRise":false,"htmlId":"lz-stock-bar","boundingBox":{"desktop":{"top":-243.25,"left":1744.47,"width":519.54,"height":10.99,"timestamp":1785755532111},"mobile":{"top":202.85,"left":37,"width":207.83,"height":10,"timestamp":1785755532257}}},"style":{"progressbar":{"wrapper":{"background":{"desktop":"rgba(228,228,228,1)"},"height":{"desktop":"11px","mobile":"10px"},"borderTopLeftRadius":{"desktop":"999px"},"borderTopRightRadius":{"desktop":"999px"},"borderBottomRightRadius":{"desktop":"999px"},"borderBottomLeftRadius":{"desktop":"999px"}},"bar":{"width":"93%","transitionDuration":"1.6s","color":"rgba(255,255,255,1)","background":{"desktop":"rgba(199,62,58,1)"},"borderTopLeftRadius":{"desktop":"999px"},"borderTopRightRadius":{"desktop":"999px"},"borderBottomRightRadius":{"desktop":"999px"},"borderBottomLeftRadius":{"desktop":"999px"},"fontFamily":"Inter","fontSize":{"desktop":"1px"}}},"outer":{"width":{"desktop":"100%"},"marginTop":{"desktop":"0px"},"marginBottom":{"desktop":"0px"}}}}];

        progressbarList.forEach(function(progressbar) {
          if(progressbar.misc.hidePercentage || !progressbar.misc.percentageRise) {
            return;
          }
          const compKey =  progressbar?.compKey?.slice(0, 7);
          const barHtml = document.querySelector(".a-p-pct-" + progressbar.compKey.slice(0, 7));
          const progressbarEle = document.querySelector(`.a-p-${compKey} .a-p-b`);
          console.log(progressbarEle, "progressbarEle");
          progressbarEle.addEventListener("animationstart", ()=> {
            readAnimation();
          })
        
          const readAnimation = () => {
          let width = 0;
          let interval = 30;
          const completeWidth = parseInt((progressbar?.style?.progressbar?.bar?.width || "50%").replace("%", ""));
          let duration = parseInt(progressbar?.style?.progressbar?.bar?.transitionDuration?.replace("s", "") || 1) * 1000;
          let increment = (interval / duration) * completeWidth;
          let id = setInterval(frame, interval); 
          
          function frame() {
            if (width >= completeWidth) {
              clearInterval(id);
            } else {
              width += increment;
              barHtml.innerText = (width > completeWidth ? completeWidth : Math.round(width)) + "%";
            }
          }} 
          readAnimation();
        });

      })();(function() {
          try {
              const clickeventList = [{"compKey":"05c2dbc","misc":{"type":"image"}},{"compKey":"496a25c","misc":{"type":"button"}},{"compKey":"6f3f79a","misc":{"type":"button"}},{"compKey":"a2dc555","misc":{"type":"button"}},{"compKey":"818415e","misc":{"type":"button"}},{"compKey":"b2d5d2d","misc":{"type":"button"}},{"compKey":"3299862","misc":{"type":"button"}},{"compKey":"9c39c16","misc":{"type":"button"}}];
    
    
              clickeventList.forEach((comp, index) => {
                  const compKey = comp?.compKey;
                  const eleType = comp?.misc?.type;
                  
                  
                  
                  
              });
    
          } catch (error) {
              return error;
          }
      })();
  (function() {
    try {
      const digitsClass = "a-cd-d";
      const list = [{"compKey":"97fb81dd-fc6c-42e1-9e91-1011f402f983","misc":{"type":"countdown","countdownType":"evergreen","dateTime":"02:00","hideLabel":false,"labelTag":"span","separator":{"active":false},"items":[{"text":"Days","show":false},{"text":"Hrs","show":true},{"text":"Mins","show":true},{"text":"Secs","show":true}],"boundingBox":{"desktop":{"top":-658.18,"left":1682.86,"width":256.07,"height":31.98,"timestamp":1785755532110},"mobile":{"top":-660.17,"left":164.45,"width":203.19,"height":27.97,"timestamp":1785755532255}}},"style":{"countdown":{"maxWidth":{"desktop":"340px","mobile":"260px"},"gap":{"desktop":"8px","mobile":"6px"},"flexDirection":"row","container":{"paddingTop":{"desktop":"5px","mobile":"4px"},"paddingRight":{"desktop":"10px","mobile":"7px"},"paddingBottom":{"desktop":"5px","mobile":"4px"},"paddingLeft":{"desktop":"10px","mobile":"7px"},"background":{"desktop":"rgba(255,255,255,0.14)"},"borderTopLeftRadius":{"desktop":"2px"},"borderTopRightRadius":{"desktop":"2px"},"borderBottomRightRadius":{"desktop":"2px"},"borderBottomLeftRadius":{"desktop":"2px"}},"digits":{"color":"rgba(255,255,255,1)","fontFamily":"Inter","fontSize":{"desktop":"14px","mobile":"12px"},"fontWeight":{"desktop":"500"}},"label":{"color":"rgba(255,255,255,0.5)","background":{"desktop":"rgba(0,0,0,0)"},"fontFamily":"Inter","fontSize":{"desktop":"11px","mobile":"10px"},"fontWeight":{"desktop":"500"},"textTransform":"uppercase","letterSpacing":{"desktop":"0.02em"}}},"topCont":{"alignSelf":{"desktop":"center"}},"outer":{"marginTop":{"desktop":"0px"},"marginBottom":{"desktop":"0px"}}}}];
      const pad = (n) => String(n).padStart(2, "0");
      list.forEach((c) => {
        const key = c?.compKey?.slice(0, 7);
        const m = c?.misc || {};
        const type = m.countdownType;
        const dateTime = m.dateTime;
        const intervalKey = "atomicat_countdown_interval_" + key;
        const el = document.querySelector(".atomicat-countdown-" + key);
        if (!el) return;
        const daysEl = el.querySelector(".atomicat-countdown-days");
        const hoursEl = el.querySelector(".atomicat-countdown-hours");
        const minutesEl = el.querySelector(".atomicat-countdown-minutes");
        const secondsEl = el.querySelector(".atomicat-countdown-seconds");
        window[intervalKey] = setInterval(() => {
          if (el.closest(".atomicat-delay") || el.closest(".atomicat-hidden")) return;
          let target;
          if (type === "evergreen") {
            const sk = "atomicat_countdown_start_" + key;
            let start = sessionStorage.getItem(sk);
            if (!start) { start = Date.now(); sessionStorage.setItem(sk, start); }
            const [h, min] = (dateTime || "0:0").split(":").map(Number);
            target = new Date(+start);
            target.setHours(target.getHours() + (h || 0));
            target.setMinutes(target.getMinutes() + (min || 0));
          } else {
            target = new Date(dateTime || 0);
          }
          const dist = target - Date.now();
          if (dist <= 0) {
            clearInterval(window[intervalKey]);
            el.querySelectorAll("." + digitsClass).forEach((d) => d.textContent = "00");
            return;
          }
          const d = Math.floor(dist / 864e5);
          const h = Math.floor((dist % 864e5) / 36e5);
          const min = Math.floor((dist % 36e5) / 6e4);
          const s = Math.floor((dist % 6e4) / 1e3);
          if (daysEl) daysEl.textContent = pad(d);
          if (hoursEl) hoursEl.textContent = pad(h);
          if (minutesEl) minutesEl.textContent = pad(min);
          if (secondsEl) secondsEl.textContent = pad(s);
        }, 1000);
      });
    } catch (e) {}
  })();
      
      function initSlider(slider) {
        const sliderKey = slider.compKey.slice(0, 7);
        if(!document.querySelector(".swiper-" + sliderKey).classList.contains("swiper-initialized")){
          const sliderClass = ".swiper-" + sliderKey;

          try {
            if (!window.swipers) {
              window.swipers = {};
            }
            if (window.swipers[sliderKey]) {
              window.swipers[sliderKey].destroy(true, true);
            }
            const isContinuous = slider?.misc?.autoplay?.mode === "continuous";
            const hasAutoplay = !!slider?.misc?.autoplay?.speed || isContinuous;
            const swiperEl = document.querySelector(sliderClass);
            if (swiperEl) {
              swiperEl.classList.toggle("a-sld-marquee", isContinuous);
            }
            window.swipers[sliderKey] = new Swiper(sliderClass, {
              loop: isContinuous || !!slider?.misc?.infiniteScroll,
              autoplay: hasAutoplay ? { delay: isContinuous ? 1 : slider?.misc?.autoplay?.speed * 1000, disableOnInteraction: false, pauseOnMouseEnter: slider?.misc?.autoplay?.pauseOnMouseEnter ? true : false } : false,
              speed: isContinuous ? (slider?.misc?.transition || 5) * 1000 : (slider?.misc?.transition ? slider?.misc?.transition * 1000 : 300),
              spaceBetween: slider?.misc?.itemGap?.desktop || slider?.misc?.itemGap?.desktop === 0 ? slider?.misc?.itemGap?.desktop : 10,
              direction: slider?.misc?.direction || 'horizontal',
              navigation: {
                nextEl: sliderClass + " .swiper-button-next",
                prevEl: sliderClass + " .swiper-button-prev",
              },
              pagination: {
                el: sliderClass + " .swiper-pagination",
                clickable: true,
              },
              observer: true,
              observeParents: true,
              watchSlidesProgress: true,
              slidesPerView: slider?.misc?.columns?.desktop || 3,
              slidesPerGroup: typeof slider?.misc?.slidesToScroll === 'number' ? slider?.misc?.slidesToScroll : slider?.misc?.slidesToScroll?.desktop || 1,
              breakpoints: {
                300: {
                  slidesPerView: slider?.misc?.columns?.mobile || 1,
                  slidesPerGroup: slider?.misc?.slidesToScroll?.mobile || 1,
                  spaceBetween: slider?.misc?.itemGap?.mobile || slider?.misc?.itemGap?.mobile === 0 ? slider?.misc?.itemGap?.mobile : 10,
                },
                640: {
                  slidesPerView: slider?.misc?.columns?.tablet || 2,
                  slidesPerGroup: slider?.misc?.slidesToScroll?.tablet || 1,
                  spaceBetween: slider?.misc?.itemGap?.tablet || slider?.misc?.itemGap?.tablet === 0 ? slider?.misc?.itemGap?.tablet : 10,
                },
                1024: {
                  slidesPerView: slider?.misc?.columns?.desktop || 3,
                  slidesPerGroup: typeof slider?.misc?.slidesToScroll === 'number' ? slider?.misc?.slidesToScroll : slider?.misc?.slidesToScroll?.desktop || 1,
                  spaceBetween: slider?.misc?.itemGap?.desktop || slider?.misc?.itemGap?.desktop === 0 ? slider?.misc?.itemGap?.desktop : 10,
                },
              },
              on: {
                init: function() {
                  // Fix fluid videos after Swiper is ready
                  setTimeout(() => {
                    const videos = this.el.querySelectorAll('.video-js');
                    if (videos.length > 0) {
                      const firstVideoParent = videos[0].parentElement;
                      firstVideoParent.style.minHeight = '200px';
                      setTimeout(() => {
                        firstVideoParent.style.minHeight = '';
                      }, 100);
                    }
                    if (hasAutoplay && this.autoplay && this.params.autoplay) {
                      this.autoplay.start();
                      if (this.autoplay.paused) this.autoplay.resume();
                    }
                    if (typeof syncSliderSlideVideos === 'function') {
                      syncSliderSlideVideos(this, slider);
                    }
                  }, 1000);
                },
                slideChange: function() {
                  if (typeof syncSliderSlideVideos === 'function') {
                    syncSliderSlideVideos(this, slider);
                  }
                },
                slideChangeTransitionEnd: function() {
                  if (typeof syncSliderSlideVideos === 'function') {
                    syncSliderSlideVideos(this, slider);
                  }
                }
              },
            });
          } catch (error) {
            console.log("swiper init error....");
            console.log(error);
          }
          document.querySelector(".swiper-" + sliderKey).classList.remove("a-hidden")
        }
      }
      
    function atomiLoadSwiperCDN() {
      return new Promise((resolve, reject) => {
        if (!window.Swiper) {
          // Add CSS
          const cssLink = document.createElement('link');
          cssLink.rel = 'stylesheet';
          cssLink.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
          cssLink.onload = () => console.log('Swiper CSS loaded');
          document.head.appendChild(cssLink);

          // Add JS
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
          script.onload = () => {
            console.log('Swiper JS loaded');
            resolve();
          };
          script.onerror = () => reject(new Error('Failed to load Swiper JS'));
          document.head.appendChild(script);
        } else {
          resolve();
        }
      });
    }
  
      
      (function() {
        const sliderList = [{"compKey":"f444e80d-6177-4edb-8872-7daf5d24dab5","misc":{"type":"slider","htmlId":"lz-galeria","columns":{"desktop":1},"slidesToScroll":{"desktop":1},"navigation":"arrowsAndDot","infiniteScroll":true,"autoplay":{"speed":0},"transition":0.4},"contents":[{"misc":{"type":"container","contentWidth":"fullWidth","htmlId":"lz-galeria-img-1"},"contents":[{"compKey":"4b65c295-8640-4338-a485-21b4baf399df","misc":{"type":"image","tag":"img","src":"https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-1254w-1.webp","alt":"Imagem 1 do produto","lazyLoad":false,"width":1254,"height":1254,"srcSet":"https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-1254w-1.webp?quality=81#592306 1254w,https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-1254w-1.webp?width=300&height=160&quality=79#604122 300w,https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-1254w-1.webp?width=768&height=409&quality=74#275470 768w,https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-1254w-1.webp?width=1024&height=545&quality=78#487060 1024w"}}]},{"misc":{"type":"container","contentWidth":"fullWidth","htmlId":"lz-galeria-img-2"},"contents":[{"compKey":"b921f837-5942-48c7-978d-b5e0a79876ff","misc":{"type":"image","tag":"img","src":"https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-29ee93-1254w-2.webp","alt":"Imagem 2 do produto","lazyLoad":true,"width":1254,"height":1254,"srcSet":"https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-29ee93-1254w-2.webp?quality=82#317447 1254w,https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-29ee93-1254w-2.webp?width=300&height=160&quality=90#389517 300w,https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-29ee93-1254w-2.webp?width=768&height=409&quality=89#324941 768w,https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-29ee93-1254w-2.webp?width=1024&height=545&quality=82#221164 1024w"}}]},{"misc":{"type":"container","contentWidth":"fullWidth","htmlId":"lz-galeria-img-3"},"contents":[{"compKey":"acc44b17-afe4-44cc-b263-860e9d90a0f8","misc":{"type":"image","tag":"img","src":"https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-eb45bb-1254w-3.webp","alt":"Imagem 3 do produto","lazyLoad":true,"width":1254,"height":1254,"srcSet":"https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-eb45bb-1254w-3.webp?quality=74#155233 1254w,https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-eb45bb-1254w-3.webp?width=300&height=160&quality=74#328487 300w,https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-eb45bb-1254w-3.webp?width=768&height=409&quality=87#671157 768w,https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-eb45bb-1254w-3.webp?width=1024&height=545&quality=90#267090 1024w"}}]},{"misc":{"type":"container","contentWidth":"fullWidth","htmlId":"lz-galeria-img-4"},"contents":[{"compKey":"78a2f411-f38d-46f0-ace8-448e52faa88d","misc":{"type":"image","tag":"img","src":"https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-c5e141-1254w-4.webp","alt":"Imagem 4 do produto","lazyLoad":true,"width":1254,"height":1254,"srcSet":"https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-c5e141-1254w-4.webp?quality=86#6700 1254w,https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-c5e141-1254w-4.webp?width=300&height=160&quality=76#819463 300w,https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-c5e141-1254w-4.webp?width=768&height=409&quality=81#456656 768w,https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-c5e141-1254w-4.webp?width=1024&height=545&quality=86#628768 1024w"}}]},{"misc":{"type":"container","contentWidth":"fullWidth","htmlId":"lz-galeria-img-5"},"contents":[{"compKey":"eec365a3-f3e3-4e27-98f8-77c8cb3811c2","misc":{"type":"image","tag":"img","src":"https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-770f72-1254w-5.webp","alt":"Imagem 5 do produto","lazyLoad":true,"width":1254,"height":1254,"srcSet":"https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-770f72-1254w-5.webp?quality=75#768087 1254w,https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-770f72-1254w-5.webp?width=300&height=160&quality=71#64700 300w,https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-770f72-1254w-5.webp?width=768&height=409&quality=71#662029 768w,https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-770f72-1254w-5.webp?width=1024&height=545&quality=90#576771 1024w"}}]},{"misc":{"type":"container","contentWidth":"fullWidth","htmlId":"lz-galeria-img-6"},"contents":[{"compKey":"c9c08aea-e365-48cc-a736-f2f7c54973ed","misc":{"type":"image","tag":"img","src":"https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-3ef609-1254w-6.webp","alt":"Imagem 6 do produto","lazyLoad":true,"width":1254,"height":1254,"srcSet":"https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-3ef609-1254w-6.webp?quality=73#600813 1254w,https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-3ef609-1254w-6.webp?width=300&height=160&quality=75#408442 300w,https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-3ef609-1254w-6.webp?width=768&height=409&quality=77#538637 768w,https://media.atomicatmedia.net/u/BOw71iZQeJVHVa5lnRhFfwP9M5A2/Pictures/mcp/lz01/linfozen-lymphatic-drops-3ef609-1254w-6.webp?width=1024&height=545&quality=82#894715 1024w"}}]}]}]
        sliderList.forEach(slider => {
          const sliderKey = slider.compKey.slice(0, 7);
          try {
            const atomi_slider_ele = document.querySelector(".a-sld-" + sliderKey)
            const atomi_slider_observer = new IntersectionObserver(async (entries) => {
              entries.forEach(async (entry) => {
                if (entry.isIntersecting) {
                  try {
                    await atomiLoadSwiperCDN();
                    initSlider(slider)
                  } catch (error) {
                    console.error('Error initializing Swiper:', error);
                  }
                  atomi_slider_observer.disconnect(); // Stop observing after initialization
                }
              });
            });

            atomi_slider_observer.observe(atomi_slider_ele);
          } catch (error) {
            console.log(error);
          }
        })
        
    window.addEventListener('load', async function() {
      console.log('Entire page fully loaded, including images and stylesheets');
      setTimeout(async () => {
        await atomiLoadSwiperCDN();
        sliderList.forEach(slider => {
          const sliderKey = slider.compKey.slice(0, 7);
          initSlider(slider)
        })
      }, 5000);
    });
  
      })();
      
    