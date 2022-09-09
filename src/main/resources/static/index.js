
function getAllProvince() {
    $.ajax({
        type: "GET",

        url: `http://localhost:8081/province/get`,
        success: function (data) {
            let content = displayTable();
            for (let i = 0; i < data.length; i++) {
                content += "<tr>"
                content += "<th>"+ data[i].id +"</th>"
                content += "<th>"+ data[i].name +"</th>"
                content += "<th>"+ data[i].country.name +"</th>"
                content += "<th><button onclick='update("+ data[i].id +")'>Update</button></th>"
                content += "<th><button onclick='deleteStudent("+ data[i].id +")'>Delete</button></th>"
                content += "<th><button onclick='displayOneProduct("+ data[i].id +")'>Detail</button></th>"
                content += "</tr>"
            }
             content += "</table>"
            let table = document.getElementById("list")
            if (table.style.display === "none") {
                table.style.display = "block"
                document.getElementById("form").style.display = "none"
            }
            document.getElementById("list").innerHTML=content;

        }
    })
}


// function displayPage(data){
//     return `<button id="backup" onclick="isPrevious(${data.pageable.pageNumber})">Previous</button>
//     <span>${data.pageable.pageNumber+1} | ${data.totalPages}</span>
//     <button id="next" onclick="isNext(${data.pageable.pageNumber})">Next</button>`
// }
// function isPrevious(number){
//     getAllProduct(number-1)
// }
// function isNext(number){
//     getAllProduct(number+1)
// }


function displayTable() {
    let result = ""
    result += "<table border='1' width='300px'>"
    result += "<tr>"
    result += "<th>STT</th>"
    result += "<th>Name</th>"
    result += "<th>country</th>"
    result += "<th colspan='3'>Action</th>"
    result += "</tr>"
    return result
}

function formCreate() {
    document.getElementById("name").value = ""
    document.getElementById("area").value = ""
    document.getElementById("popular").value = ""
    document.getElementById("gdp").value = ""
    document.getElementById("description").value = ""
    document.getElementById("country").value = ""
    document.getElementById("button").innerHTML = "Create"
    document.getElementById("form").style.display = "block"
    document.getElementById("list").style.display = "none"
    document.getElementById("button").setAttribute("onclick", "createProduct()")
    getCategory();
}

let idProvince;

function update(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/province/" + id,
        success: function (data) {
            idProvince = data.id
            document.getElementById("name").value = data.name
            document.getElementById("area").value = data.area
            document.getElementById("popular").value = data.popular
            document.getElementById("gdp").value = data.gdp
            document.getElementById("description").value = data.description
            document.getElementById("country").value = data.country.name
            document.getElementById("button").innerHTML = "Update"
            document.getElementById("form").style.display = "block"
            document.getElementById("list").style.display = "none"
            document.getElementById("button").setAttribute("onclick", "updateProvince()")
            getCategory();
        }
    })
}

function deleteStudent(id) {
    let choice = confirm("Mời bạn xác nhận!");
    if (choice == true) {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8081/province/" + id,
            success: getAllProvincec
        })
    }else {
        getAllProduct();
    }

}

function updateProvince() {
    let name = $('#name').val();
    let area = $('#area').val();
    let description = $('#description').val();
    let popular = $('#popular').val();
    let country_id = $('#country').val();
    let gdp = $('#gdp').val();

    let province = {
        id: idProvince,
        name: name,
        area: area,
        description : description,
        popular : popular,
        gdp: gdp,
        country: {
            id: country_id
        }
    }
    $.ajax({
        type: "PUST",
        contentType: false,
        processData: false,
        url: "http://localhost:8081/province",
        data: JSON.stringify(province),
        success: function () {
            getAllProvince()
        }
    })
    event.preventDefault()
}

function createProduct() {
    let name = $('#name').val();
    let area = $('#area').val();
    let description = $('#description').val();
    let popular = $('#popular').val();
    let country_id = $('#country').val();
    let gdp = $('#gdp').val();

    let province = {
        name: name,
        area: area,
        description : description,
        popular : popular,
        gdp: gdp,
        country: {
            id: country_id
        }
    }
    $.ajax({
        type: "POST",
        contentType: false,
        processData: false,
        url: "http://localhost:8081/province/create",
        data: JSON.stringify(province),
        success: function () {
            getAllProvince()
        }
    })
    event.preventDefault()
}


function getCategory() {
    $.ajax({
        type: "GET",
        //tên API
        url: `http://localhost:8081/province/country`,
        success: function (cate) {
            let content = ``
            for (let i = 0; i < cate.length; i++) {
                content += `<option id="${cate[i].id}" value="${cate[i].id}">${cate[i].name}</option>`;
            }
            document.getElementById('country').innerHTML = content;
        }
    });
}

// đây là search trả ra page



// function displayOneProduct(id){
//     $ajax({
//         type: "GET",
//         url: "http://localhost:8081/products/" + id,
//         success: function (data) {
//             let result = ""
//             result += "<table border='1' width='300px'>"
//             result += "<tr>"
//             result += "<th>Name</th>"
//             result += "<td>"+data.name+"</td></tr>"
//             result += "<tr><th>Price</th>"
//             result += "<td>"+data.price+"</td></tr>"
//
//             result += "<tr><th>Quantity</th>"
//             result += "<td>"+data.quantity+"</td></tr>"
//
//             result += "<tr><th>Description</th>"
//             result += "<td>"+data.description+"</td></tr>"
//             result += "<tr><th>Image</th>"
//             result += " <td>"+ '<img  src="'+"image/" + data.imageUrl +'"  width="100" height="100" alt="kocoanh">' + "</td></tr>"
//             result += "<tr><th>Category</th>"
//             result += "<td>"+data.category.name+"</td></tr>"
//
//             result += "</table>"
//             document.getElementById("detail").style.display = "block"
//             document.getElementById("displayPageByName").style.display = "block"
//             document.getElementById("displayPage").style.display = "block"
//             document.getElementById("displayPageByName").style.display = "block"
//             document.getElementById("displayPageByName").style.display = "block"
//             document.getElementById("detail").innerHTML= result;
//         }
//     })
// }



// đây là search trả ra list

// function searchProduct() {
//     let search = document.getElementById("search").value;
//     $.ajax({
//         type: "GET",
//         url: `http://localhost:8081/products/search?search=${search}`,
//         success: function (data) {
//             let content = displayTable();
//             for (let i = 0; i < data.length; i++) {
//                 content += "<tr>"
//                 content += "<th>"+ data[i].name +"</th>"
//                 content += "<th>"+ data[i].price +"</th>"
//                 content += "<th>"+ data[i].quantity +"</th>"
//                 content += "<th>"+ data[i].description +"</th>"
//                 content += " <th>"+ '<img  src="'+"image/" + data[i].imageUrl +'"  width="100" height="100" alt="kocoanh">' + "</th>"
//                 content += "<th>"+ data[i].category.name +"</th>"
//                 content += "<th><button onclick='update("+ data[i].id +")'>Update</button></th>"
//                 content += "<th><button onclick='deleteStudent("+ data[i].id +")'>Delete</button></th>"
//                 content += "</tr>"
//             }
//             content += "</table>"
//             let table = document.getElementById("listSearch")
//             if (table.style.display === "none") {
//                 table.style.display = "block"
//                 document.getElementById("form").style.display = "none"
//                 document.getElementById("displayPage").style.display = "none"
//             }
//             document.getElementById("list").style.display = "none"
//             document.getElementById("listSearch").innerHTML = content;
//         }
//     });
//     event.preventDefault();
// }
