var weeklist = document.getElementById("weeklist");


const links = [
    {
    label: "Week01",
    url: "week1/index.html"
    },
    {
    label: "Week02",
    url: "week2/index.html"
    },
    {
    label: "Week03",
    url: "week3/index.html"
    },
    {
        label: "Week04",
        url: "week4/index.html"
    }
]

links.forEach((link) => {
    weeklist.innerHTML += "<li><a href='" + link.url + "'>" + link.label + "</a></li>";
});