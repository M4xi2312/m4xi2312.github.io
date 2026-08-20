function applySystemTheme() {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    document.documentElement.setAttribute(
        "data-bs-theme",
        isDark ? "dark" : "light"
    );
}

async function loadComponent(id, path) {
    const element = document.getElementById(id);

    if (!element) {
        return;
    }

    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`Failed to load component: ${path}`);
        }

        element.innerHTML = await response.text();
    } catch (error) {
        console.error(error);
    }
}

applySystemTheme();

const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

colorScheme.addEventListener("change", applySystemTheme);

document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header", "/components/header.html");
    loadComponent("footer", "/components/footer.html");
});
