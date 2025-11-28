class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `\
            <style>
                :host {
                    display: block;
                    width: 100%;
                    margin-top: auto;
                }
                
                .footer {
                    background: rgba(17, 24, 39, 0.8);
                    backdrop-filter: blur(20px);
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 2rem 0;
                    margin-top: 4rem;
                }
                
                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }
                
                .footer-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 2rem;
                }
                
                .footer-logo {
                    display: flex;
                    align-items: center;
                    font-weight: 700;
                    font-size: 1.25rem;
                    color: white;
                    text-decoration: none;
                }
                
                .footer-links {
                    display: flex;
                    gap: 2rem;
                }
                
                .footer-link {
                    color: #d1d5db;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .footer-link:hover {
                    color: #22d3ee;
                }
                
                .footer-bottom {
                    margin-top: 2rem;
                    padding-top: 2rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    text-align: center;
                    color: #9ca3af;
                    font-size: 0.875rem;
                }
                
                @media (max-width: 768px) {
                    .footer-content {
                        flex-direction: column;
                        text-align: center;
                    }
                    
                    .footer-links {
                        flex-direction: column;
                        gap: 1rem;
                    }
                }
            </style>
            <footer class="footer">
                <div class="footer-container">
                    <div class="footer-content">
                        <a href="index.html" class="footer-logo">
                            <i data-feather="cpu"></i>
                            LambdaMine Pro
                        </a>
                        
                        <div class="footer-links">
                            <a href="terms.html" class="footer-link">
                                <i data-feather="file-text"></i>
                                Conditions
                            </a>
                            <a href="privacy.html" class="footer-link">
                                <i data-feather="shield"></i>
                                Confidentialité
                            </a>
                            <a href="contact.html" class="footer-link">
                                <i data-feather="mail"></i>
                                Contact
                            </a>
                        </div>
                    </div>
                    
                    <div class="footer-bottom">
                        <p>&copy; 2024 LambdaMine Pro. Tous droits réservés.</p>
                        <p class="mt-2">Taux de minage: 0.00001 $LAMDA/sec • Cycle: 2 heures</p>
                    </div>
                </div>
            </footer>
        `;
        
        // Initialize feather icons after component is rendered
        setTimeout(() => {
            if (window.feather) {
                window.feather.replace();
            }
        }, 100);
    }
}

customElements.define('custom-footer', CustomFooter);