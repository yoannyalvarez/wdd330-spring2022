var weeklist = document.getElementById("weeklist");
var challengelist = document.getElementById("challengelist");


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
    }
]

const challengelinks = [
    {
        label: "ToDo App",
        url: "Challenges/ToDo Challenge/index.html"
    },
    {
        label: "My Movie Journey App",
        url: "Challenges/My Movie Journey Challenge/index.html"
    }
]

links.forEach((link) => {
    weeklist.innerHTML += "<li><a href='" + link.url + "'>" + link.label + "</a></li>";
});

challengelinks.forEach((link) => {
    challengelist.innerHTML += "<li><a href='" + link.url + "'>" + link.label + "</a></li>";
});