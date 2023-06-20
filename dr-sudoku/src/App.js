import './App.scss';

function App() {
  return (
    <div class="frame">

      <div class="wrapper {{themeService.getTheme()}}" id="wrapper">

          <div class="header {{themeService.getTheme()}}" id="header">

              <h1 class="header-item {{themeService.getTheme()}}" id="name" routerLink="/">Dr. Sudoku</h1>

              <button
                  type="button" 
                  class="theme-btn {{themeService.getTheme()}}" 
                  id="lite">
                  <span class="tooltip">Switch to dark theme</span>
                  <i class="bi bi-lightbulb-fill {{themeService.getTheme()}}"></i>
              </button>

              <button
                  type="button" 
                  class="theme-btn {{themeService.getTheme()}}" 
                  id="dark">
                  <span class="tooltip">Switch to light theme</span>
                  <i class="bi bi-lightbulb {{themeService.getTheme()}}"></i>
              </button>

          </div>
          
          <router-outlet></router-outlet>

          <div class="footer {{themeService.getTheme()}}" id="footer">

              <h2 class="footer-item {{themeService.getTheme()}}" id="license" routerLink="/license">
                  <span class="tooltip">Open license</span>
                  Copyright © 2023 Gabriel C. Trahan
              </h2>

              <h2 class="footer-item {{themeService.getTheme()}}" id="version">v2.0</h2>

              <h2 class="footer-item {{themeService.getTheme()}}" id="connect">
                  <span class="tooltip">Go to repository</span>
                  Fork me:
                  <a class="{{themeService.getTheme()}}" href="https://github.com/theokoles7/Dr-Sudoku">
                      <i class="bi bi-github {{themeService.getTheme()}}"></i>
                  </a>
              </h2>

          </div>

      </div>
    </div>
  );
}

export default App;
