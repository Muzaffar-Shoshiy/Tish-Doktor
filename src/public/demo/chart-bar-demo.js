Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';


// Bar Chart Example
var ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
type: 'bar',
data: {
    labels: ["Toshkent shahar", "Toshkent", "Andijon", "Namangan", "Farg'ona", "Sirdaryo","Jizzax", "Buxoro", "Xorazm", "Surxondaryo", "Qashqadaryo", "Navoiy", "Samarqand"],
    datasets: [{
    label: "Regions",
    backgroundColor: "green",
    borderColor: "rgba(2,117,216,1)",
    data: [200, 12, 51, 41, 21, 84,15, 12, 51, 41, 21, 84],
    }],
},
options: {
    scales: {
    xAxes: [{
        time: {
        unit: 'month'
        },
        gridLines: {
        display: false
        },
        ticks: {
        maxTicksLimit: 6
        }
    }],
    yAxes: [{
        ticks: {
        min: 0,
        max: 250,
        maxTicksLimit: 5
        },
        gridLines: {
        display: true
        }
    }],
    },
    legend: {
    display: true
    }
}
});