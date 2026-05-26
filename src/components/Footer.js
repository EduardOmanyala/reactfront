// src/components/Home.js
export default function Footer() {
  return (
    <div id="footer">
        <div class="container">
            <footer class="glass">
                <div class="footer-content">
                    <div class="footer-links">
                        <a href="/about-us" onclick="showPage('about')">About Us</a>
                        <a href="/privacy-policy">Privacy Policy</a>
                        <a href="/terms-of-service">Terms of Service</a>
                        <a href="/posts/">Blog</a>
                        <a href="/contact" onclick="showPage('contact')">Contact</a>
                    </div>
                    <div className="copyright">
                        &copy; {new Date().getFullYear()} Ken-Lib. All rights reserved.
                        {" "}
                    </div>
                </div>
            </footer>
        </div>
    </div>


  );
}
