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
    },
    {
        label: "Week05",
        url: "week5/index.html"
    },
    {
        label: "Week07",
        url: "week7/index.html"
    },
    {
        label: "Week08",
        url: "week8/index.html"
    },
    {
        label: "Week09",
        url: "week9/index.html"
    },
    {
        label: "Week10",
        url: "week10/index.html"
    },
    {
        label: "Week11",
        url: "week11/index.html"
    },
    {
        label: "Week12",
        url: "week12/index.html"
    }
]

links.forEach((link) => {
    weeklist.innerHTML += "<li><a href='" + link.url + "'>" + link.label + "</a></li>";
});