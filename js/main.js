var weeklist = document.getElementById("weeklist");


const links = [
    {
    label: "Week01",
    url: "week1/index.html"
    },
    {
        label: "Week02",
        url: "week2/index.html"
    }
]

links.forEach((link) => {
    weeklist.innerHTML = "<li><a href='" + link.url + "'>" + link.label + "</a></li>";
});