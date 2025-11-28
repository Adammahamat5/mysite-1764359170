class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `\
            <style>
                :host {
                    display: block;
                    width: 100%;
                }
                
                .navbar {
                    background: rgba(17, 24, 39, 0.8);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 1rem 0;
                }
                
                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .logo {
                    display: flex;
                    align-items: center;
                    font-weight: 700;
                    font-size: 1.5rem;
                    text-decoration: none;
                    color: white;
                }
                
                .logo-icon {
                    color: #22d3ee;
                    margin-right: 0.5rem;
                }
                
                .nav-links {
                    display: flex;
                    gap: 2rem;
                    align-items: center;
                }
                
                .nav-link {
                    color: #d1d5db;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .nav-link:hover {
                    color: #22d3ee;
                }
                
                @media (max-width: 768px) {
                    .nav-links {
                        display: none;
                    }
                    
                    .mobile-menu-btn {
                        display: block;
                    }
                }
                
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                }
            </style>
            <nav class="navbar">
                <div class="nav-container">
                    <a href="index.html" class="logo">
                        <i data-feather="cpu" class="logo-icon"></i>
                        LambdaMine Pro
                    </a>
                    
                    <div class="nav-links">
                        <a href="index.html" class="nav-link">
                            <i data-feather="home"></i>
                            Accueil
                        </a>
                        <a href="stats.html" class="nav-link">
                            <i data-feather="bar-chart-2"></i>
                            Statistiques
                        </a>
                        <a href="faq.html" class="nav-link">
                            <i data-feather="help-circle"></i>
                            FAQ
                        </a>
                    </div>
                    
                    <button class="mobile-menu-btn">
                        <i data-feather="menu"></i>
                    </button>
                </div>
            </nav>
        `;
        
        // Initialize feather icons after component is rendered
        setTimeout(() => {
            if (window.feather) {
                window.feather.replace();
            }
        }, 100);
    }
}

customElements.define('custom-navbar', CustomNavbar);