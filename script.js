let palettesBtn = document.getElementById("palettesBtn");
let sectionPalettes = document.getElementById("sectionPalettes");
const searchInput = document.querySelector(".inputValue");
const colorFilters = document.getElementById("colorFilters")
const hexColor = () => {
    let HexValues = "0123456789abcdef";
    let color = "#";
    for(let i = 0; i < 6; i++){
    color += HexValues[Math.floor(Math.random()*16)];
    }
    return color;
};
    // 2. FILTER FUNCTION 
   function createPalettes(count = 15){ 

    let generatedPalettes = JSON.parse(localStorage.getItem("generatedPalettes")) || [];

    for(let i = 0; i < count; i++){

        let wrapper = document.createElement("div");
        wrapper.classList.add("palette-wrapper");

        let palette = document.createElement("div");
        palette.classList.add("palette");

        let colors = [];              // ✅ FIX HERE
        let colorNameList = [];      // ✅ FIX HERE

        let like = document.createElement("i");
        like.className = "fa-regular fa-heart like-btn";

        for(let j = 0; j < 3; j++){

            let box = document.createElement("div");
            box.classList.add("box");

            let color = hexColor();
            colors.push(color);

            colorNameList.push(hexToName(color)); // ✅ FIX HERE

            box.style.backgroundColor = color;

            let button = document.createElement("button");
            button.classList.add("code-color");
            button.textContent = color;

            box.appendChild(button);
            palette.appendChild(box);
        }

        // ✅ FIX: set AFTER loop
        wrapper.setAttribute(
            "data-colors",
           colorNameList.join(",").toLowerCase()
         );
        wrapper.appendChild(palette);
        wrapper.appendChild(like);

        sectionPalettes.appendChild(wrapper);

        generatedPalettes.push(colors);
    }

    localStorage.setItem("generatedPalettes", JSON.stringify(generatedPalettes));
}
    

    // 👉 જો કોઈ match ના મળે તો બધું show કરી દો
   function filterColor(color) {

    const searchInput = document.querySelector(".inputValue")
    searchInput.value = color; // input ma color show karva mate

    const palettes = document.querySelectorAll(".palette-wrapper");

    let found = false;

    palettes.forEach(palette => {
        const data = palette.getAttribute("data-colors");

        if (data && data.includes(color.toLowerCase())) {
            palette.style.display = "block";
            found = true;
        } else {
            palette.style.display = "none";
        }
    });

    if (!found) {
        palettes.forEach(p => p.style.display = "block");
    }
}
    function hexToName(hex){

    let r = parseInt(hex.slice(1,3),16);
    let g = parseInt(hex.slice(3,5),16);
    let b = parseInt(hex.slice(5,7),16);

    if(r > 200 && g > 200 && b > 200) return "white";

    // Black
    if(r < 50 && g < 50 && b < 50) return "black";

    // Yellow
    if(r > 180 && g > 180 && b < 120) return "yellow";

    // Purple
    if(r > 120 && b > 120 && g < 120) return "purple";

    // Orange
    if(r > 180 && g > 100 && g < 180 && b < 100) return "orange";

    // Pinks
    if(r > 180 && b > 180 && g < 180) return "pink";

    if (b > r && b > g) return "blue";
    if (g > r && g > b) return "green";
    if (r > g && r > b) return "red";

    return "other";
}
// 3. SHOW ALL FUNCTION (optional)
function showAll() {
    document.querySelectorAll(".palette-wrapper").forEach(p => {
        p.style.display = "block";
    });
}      
    //  input par click button show
    searchInput.addEventListener("focus", () => {
        colorFilters.classList.add("show");
    });
    // input bahar click thay hide karo
    document.addEventListener("click", (e) => {
        if(
            !searchInput.contains(e.target) && 
            !colorFilters.contains(e.target)
        ){
            colorFilters.classList.remove("show");
        }
    })
    function renderSavedPalettes (palettes) {

        palettes.forEach(colors => {
            let wrapper = document.createElement("div");
            let colorNameList = [];

colors.forEach(color => {
    colorNameList.push(hexToName(color));
});

wrapper.setAttribute(
    "data-colors",
    colorNameList.join(",").toLowerCase()
);
            wrapper.classList.add("palette-wrapper");

             let palette = document.createElement("div");
             palette.classList.add("palette");

            let like = document.createElement("i");
            like.className = "fa-regular fa-heart like-btn";
            let savedPalettes =
    JSON.parse(localStorage.getItem("savedPalettes")) || [];

// initial state
if (
    savedPalettes.some(
        p => JSON.stringify(p) === JSON.stringify(colors)
    )
) {
    like.classList.remove("fa-regular");
    like.classList.add("fa-solid");
}

        like.addEventListener("click", () => {

    let savedPalettes =
        JSON.parse(localStorage.getItem("savedPalettes")) || [];

    if (like.classList.contains("fa-solid")) {

        savedPalettes = savedPalettes.filter(
            palette =>
                JSON.stringify(palette) !== JSON.stringify(colors)
        );

        localStorage.setItem(
            "savedPalettes",
            JSON.stringify(savedPalettes)
        );

        like.classList.remove("fa-solid");
        like.classList.add("fa-regular");

    } else {

        savedPalettes.push(colors);

        localStorage.setItem(
            "savedPalettes",
            JSON.stringify(savedPalettes)
        );

        like.classList.remove("fa-regular");
        like.classList.add("fa-solid");
    }
});
            
        colors.forEach(color => {

            let box = document.createElement("div");
            box.classList.add("box");

            box.style.backgroundColor = color;

            let button = document.createElement("button");
            button.classList.add("code-color");
            button.textContent = color;

            box.appendChild(button);
            palette.appendChild(box);
        });

            wrapper.appendChild(palette);
            wrapper.appendChild(like);

            sectionPalettes.appendChild(wrapper);

        })
    }
    window.addEventListener("DOMContentLoaded", () => {
        sectionPalettes.classList.add("show");

        let savedGeneratedPalettes = 
        JSON.parse(localStorage.getItem("generatedPalettes"));

        if(savedGeneratedPalettes && savedGeneratedPalettes.length > 0){
            renderSavedPalettes(savedGeneratedPalettes);
        }else{
            createPalettes(15);
        }
        
    });
    //  
    // Step 3: Infinite Scroll

    window.addEventListener("scroll", () => {
        if(
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 100
        ) 
         {
            createPalettes(15);
        }
    });
    //search input ma color mate
   
searchInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        const searchValue = searchInput.value
            .toLowerCase()
            .trim();

        document
            .querySelectorAll(".palette-wrapper")
            .forEach(palette => {

                const colors = palette.dataset.colors
                    .split(",")
                    .map(c => c.trim().toLowerCase());

                if (
                    searchValue === "" ||
                    colors.includes(searchValue)
                ) {
                    palette.style.display = "block";
                } else {
                    palette.style.display = "none";
                }
            });searchInput.value = "";
    }
    
});
function showAll() {

    document.querySelector(".inputValue").value = "";

    document
        .querySelectorAll(".palette-wrapper")
        .forEach(palette => {
            palette.style.display = "block";
        });
}
const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
});
    //  copy color hexcode
    sectionPalettes.addEventListener("click", (e) => {
        if(e.target.classList.contains("code-color")){

            navigator.clipboard.writeText(e.target.textContent);

            let oldText = e.target.textContent;
            e.target.textContent = "copied";

            setTimeout(() => {
                e.target.textContent = oldText
            },1000);
        }
    })

     
