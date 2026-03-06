import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function CustomCursor() {
  const location = useLocation();

  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    if (!cursor || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX; 
      my = e.clientY; 
      cursor.style.left = mx + 'px'; 
      cursor.style.top = my + 'px';
    };
    
    let req: number;
    const anim = () => {
      rx += (mx - rx) * 0.12; 
      ry += (my - ry) * 0.12; 
      ring.style.left = rx + 'px'; 
      ring.style.top = ry + 'px'; 
      req = requestAnimationFrame(anim);
    };

    document.addEventListener('mousemove', handleMouseMove);
    anim();

    const updateHoverElements = () => {
      const hoverElements = document.querySelectorAll('a, button, .service-card, .zone-card, .stat-item, .tarif-card, .testi-card, .faq-item, .how-step, .partner-logo, .img-band-item, .nav-cta, select, input');
      
      const handleMouseEnter = () => {
        cursor.style.width = '20px'; 
        cursor.style.height = '20px'; 
        ring.style.width = '54px'; 
        ring.style.height = '54px';
      };
      
      const handleMouseLeave = () => {
        cursor.style.width = '12px'; 
        cursor.style.height = '12px'; 
        ring.style.width = '36px'; 
        ring.style.height = '36px';
      };

      hoverElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });

      return () => {
        hoverElements.forEach(el => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    };

    const cleanupHover = updateHoverElements();

    // Re-bind on location change or DOM changes
    const observer = new MutationObserver(() => {
        updateHoverElements();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(req);
      cleanupHover();
      observer.disconnect();
    };
  }, [location.pathname]);

  return (
    <>
      <div className="cursor" id="cursor"></div>
      <div className="cursor-ring" id="cursorRing"></div>
    </>
  );
}
