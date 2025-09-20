// src/components/Home.js
export default function Footer() {
  return (
    <div id="footer">
        <div class="container">
            <footer class="glass">
                <div class="footer-content">
                    <div class="footer-links">
                        <a href="https://www.youtube.com/" onclick="showPage('about')">About Us</a>
                        <a href="https://www.youtube.com/">Privacy Policy</a>
                        <a href="https://www.youtube.com/">Terms of Service</a>
                        <a href="https://www.youtube.com/">XML Sitemap</a>
                        <a href="https://www.youtube.com/" onclick="showPage('contact')">Contact</a>
                    </div>
                    <div class="copyright">
                        &copy; 2025 Glossy Touch. All rights reserved. Crafted with modern web technologies. 
                        Provided by 
                    </div>
                </div>
            </footer>
        </div>
    </div>


  );
}
