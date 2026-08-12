(function () {
      var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
      var total = slides.length;
      var idx = 0;
      var timer = null;
      var pageCur = document.getElementById("pageCur");
      var durSec = document.getElementById("durSec");

      function pad(n) {
        return n < 10 ? "0" + n : String(n);
      }

      function show(i) {
        if (i < 0) i = 0;
        if (i >= total) i = total - 1;
        idx = i;
        slides.forEach(function (s, j) {
          s.classList.toggle("is-active", j === idx);
        });
        pageCur.textContent = pad(idx + 1);
        var ms = parseInt(slides[idx].getAttribute("data-autoslide"), 10);
        var sec = ms ? Math.round(ms / 1000) : (parseInt(slides[idx].getAttribute("data-sec"), 10) || 35);
        durSec.textContent = String(sec);
        arm(sec);
      }

      function arm(sec) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
          if (idx < total - 1) show(idx + 1);
        }, sec * 1000);
      }

      function next() {
        if (idx < total - 1) show(idx + 1);
      }

      function prev() {
        if (idx > 0) show(idx - 1);
      }

      document.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
          e.preventDefault();
          next();
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
          e.preventDefault();
          prev();
        } else if (e.key === "Home") {
          e.preventDefault();
          show(0);
        } else if (e.key === "End") {
          e.preventDefault();
          show(total - 1);
        }
      });

      var touchY = null;
      document.addEventListener("touchstart", function (e) {
        if (e.touches && e.touches[0]) touchY = e.touches[0].clientY;
      }, { passive: true });
      document.addEventListener("touchend", function (e) {
        if (touchY == null || !e.changedTouches || !e.changedTouches[0]) return;
        var dy = e.changedTouches[0].clientY - touchY;
        touchY = null;
        if (Math.abs(dy) < 40) return;
        if (dy < 0) next();
        else prev();
      }, { passive: true });

      show(0);
    })();
