// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><li class="part-title">Part 1: Overview</li><li class="chapter-item expanded "><a href="abstract.html"><strong aria-hidden="true">1.</strong> Abstract</a></li><li class="chapter-item expanded "><a href="introduction.html"><strong aria-hidden="true">2.</strong> Introduction</a></li><li class="chapter-item expanded "><a href="background.html"><strong aria-hidden="true">3.</strong> Background and Motivation</a></li><li class="chapter-item expanded "><a href="related-work.html"><strong aria-hidden="true">4.</strong> Related Work</a></li><li class="chapter-item expanded affix "><li class="part-title">Part 2: Methodology</li><li class="chapter-item expanded "><a href="methodology.html"><strong aria-hidden="true">5.</strong> The Linux Luminarium Approach</a></li><li class="chapter-item expanded "><a href="lightweight-labs.html"><strong aria-hidden="true">6.</strong> Lightweight Labs Design</a></li><li class="chapter-item expanded "><a href="teaching-strategies.html"><strong aria-hidden="true">7.</strong> Teaching Strategies</a></li><li class="chapter-item expanded "><a href="pedagogical-framework.html"><strong aria-hidden="true">8.</strong> Pedagogical Framework</a></li><li class="chapter-item expanded affix "><li class="part-title">Part 3: Implementation</li><li class="chapter-item expanded "><a href="system-architecture.html"><strong aria-hidden="true">9.</strong> System Architecture</a></li><li class="chapter-item expanded "><a href="implementation.html"><strong aria-hidden="true">10.</strong> Implementation Details</a></li><li class="chapter-item expanded "><a href="technology-stack.html"><strong aria-hidden="true">11.</strong> Technology Stack</a></li><li class="chapter-item expanded "><a href="case-studies.html"><strong aria-hidden="true">12.</strong> Case Studies</a></li><li class="chapter-item expanded affix "><li class="part-title">Part 4: Evaluation and Results</li><li class="chapter-item expanded "><a href="evaluation-methodology.html"><strong aria-hidden="true">13.</strong> Evaluation Methodology</a></li><li class="chapter-item expanded "><a href="results.html"><strong aria-hidden="true">14.</strong> Results</a></li><li class="chapter-item expanded "><a href="discussion.html"><strong aria-hidden="true">15.</strong> Discussion</a></li><li class="chapter-item expanded "><a href="limitations.html"><strong aria-hidden="true">16.</strong> Limitations</a></li><li class="chapter-item expanded affix "><li class="part-title">Part 5: Conclusion</li><li class="chapter-item expanded "><a href="conclusion.html"><strong aria-hidden="true">17.</strong> Conclusion</a></li><li class="chapter-item expanded "><a href="future-work.html"><strong aria-hidden="true">18.</strong> Future Work</a></li><li class="chapter-item expanded affix "><li class="part-title">Appendices</li><li class="chapter-item expanded "><a href="references.html"><strong aria-hidden="true">19.</strong> References</a></li><li class="chapter-item expanded "><a href="glossary.html"><strong aria-hidden="true">20.</strong> Glossary</a></li><li class="chapter-item expanded "><a href="appendix-a.html"><strong aria-hidden="true">21.</strong> Appendix A: Additional Materials</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
