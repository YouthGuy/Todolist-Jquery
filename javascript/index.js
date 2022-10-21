$(document).ready(function () {
    // 提交文本后新增一行
    // var textListDataALL = [{"text": "星期一摸鱼","status": "1"},{"text": "星期二摸鱼","status": "完成"},{"text": "星期三摸鱼","status": "完成"}];
    var textListDataALL = [];
    var textListDataView = [];
    // li和Json绑定的索引号
    var ArrTextindex = 0;
    // 记录筛选的当前页面
    var filterStatus = 1;
    // 倒计时时间函数
    function countDown(time) {
        var nowTime = +new Date();
        var inputTime = +new Date(time);
        var checkTime = inputTime - nowTime; 
        var times = (inputTime - nowTime) / 1000; 
            var d = parseInt(times / 60 / 60 / 24);
            d = d < 10 ? '0' + d : d;
            var h = parseInt(times / 60 / 60 % 24);
            h = h < 10 ? '0' + h : h;
            var m = parseInt(times / 60 % 60);
            m = m < 10 ? '0' + m : m;
            var s = parseInt(times % 60);
            s = s < 10 ? '0' + s : s;
            console.log('剩余' + d + '天' + h + '时' + m + '分' + s + '秒');
            return checkTime;
            
    }
    var timer = '2022-9-8 18:24:5'; 
    countDown(timer);
    // 倒计时思路 将数据设定一个预计时间 和倒计时时间戳，如果等于 0 将数据转换状态
    // 利用循环将数组内所有的数据进行遍历 然后把每个时间都传入到函数内进行判断
    function PTime() {
        for (let i = 0; i < textListDataALL.length; i++) {
            var fTime = textListDataALL[i].futuretime;
            let checkTime = countDown(fTime);
            console.log("剩余时间: " + checkTime);
            textListDataALL[i].checktime = checkTime;
            if (checkTime <= 0) {
                textListDataALL[i].status = 3;
                console.log(textListDataALL);
            }
            
        }
    }
    // 格式化时间函数
    function getDate() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var dates = date.getDate();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;

        return year + "-" + month + "-" + dates + " " + h + ':' + m + ':' + s;
    }
    console.log(getDate());
    // 数组排序函数
    function textArraySort(a,b) { 
        return a.checktime < b.checktime ? -1 : 1
    }
    // 数据读取 删除 修改的测试
    function textListUpdate() {
        $("#text_list li").remove();
        PTime();
        console.log("排序前:");
        console.log(textListDataView);
        textListDataView.sort(textArraySort);
        console.log("排序后:");
        console.log(textListDataView);
        if (textListDataView.length != 0) {
            for (let i = 0; i < textListDataView.length; i++) {
                if (filterStatus == 1 && textListDataView[i].status == 1) {
                    $("#text_list").append("<li date_index=" + textListDataView[i].id + " title=" + textListDataView[i].futuretime + "><input type='checkbox' name='text-list-check' style='display: none;'><p>" + textListDataView[i].text + "</p><a href='JavaScript:void(0);'>删除</a><a href='JavaScript:void(0)' id='edit'>修改</a></li>");
                    $("#text_list").children("li").eq(i).css("background-color", "#fff");
                    $("#text_list").children("li").eq(i).children("p").css("text-decoration", "none");
                    $("#text_list").children("li").eq(i).children("input").prop("checked", false);
                }
                if (filterStatus == 2 && textListDataView[i].status == 2) {
                    $("#text_list").append("<li date_index=" + textListDataView[i].id + " title=" + textListDataView[i].futuretime + "><input type='checkbox' name='text-list-check' style='display: none;'><p>" + textListDataView[i].text + "</p><a href='JavaScript:void(0);'>删除</a><a href='JavaScript:void(0)' id='edit'>修改</a></li>");
                    $("#text_list").children("li").eq(i).css("background-color", "rgb(204, 232 , 207)");
                    $("#text_list").children("li").eq(i).children("p").css("text-decoration", "line-through");
                    $("#text_list").children("li").eq(i).children("input").prop("checked", true);
                }
                if (filterStatus == 3) {
                    if (textListDataView[i].status == "1") {
                        $("#text_list").append("<li date_index=" + textListDataView[i].id + " title=" + textListDataView[i].futuretime + "><input type='checkbox' name='text-list-check' style='display: none;'><p>" + textListDataView[i].text + "</p><a href='JavaScript:void(0);'>删除</a><a href='JavaScript:void(0)' id='edit'>修改</a></li>");
                        $("#text_list").children("li").eq(i).css("background-color", "#fff");
                        $("#text_list").children("li").eq(i).children("p").css("text-decoration", "none");
                        $("#text_list").children("li").eq(i).children("input").prop("checked", false);
                    } 
                    else if (textListDataView[i].status == "2") {
                        $("#text_list").append("<li date_index=" + textListDataView[i].id + " title=" + textListDataView[i].futuretime + "><input type='checkbox' name='text-list-check' style='display: none;'><p>" + textListDataView[i].text + "</p><a href='JavaScript:void(0);'>删除</a><a href='JavaScript:void(0)' id='edit'>修改</a></li>");
                        $("#text_list").children("li").eq(i).css("background-color", "rgb(204, 232 , 207)");
                        $("#text_list").children("li").eq(i).children("p").css("text-decoration", "line-through");
                        $("#text_list").children("li").eq(i).children("input").prop("checked", true);
                    } else {
                        $("#text_list").append("<li date_index=" + textListDataView[i].id + " title=" + textListDataView[i].futuretime + "><input type='checkbox' name='text-list-check' style='display: none;'><p>" + textListDataView[i].text + "</p><a href='JavaScript:void(0);'>删除</a><a href='JavaScript:void(0)' id='edit'>修改</a></li>");
                        $("#text_list").children("li").eq(i).css("background-color", "red");
                        $("#text_list").children("li").eq(i).children("p").css("text-decoration", "line-through");
                        $("#text_list").children("li").eq(i).children("input").prop("checked", true);
                    }
                }
                // 可以把渲染代码单独封装在函数内在调用
                // 可后续优化数组存储innerText，在将数组的直接一次性渲染，减少时间戳，提高性能。
                // 如果当前是进行中的页面 就只渲染状态1的
                // $("#text_list").append("<li date_index=" + i + "><input type='checkbox' name='text-list-check' style='display: none;'><p>" + textListDataALL[i].text + "</p><a href='JavaScript:void(0);'>删除</a></li>");
                //     if (textListDataView[i].status == "1") {
                //         // 获取当前添加的行li[i]
                //         // console.log($("#text_list").children("li").eq(i));
                //         $("#text_list").children("li").eq(i).css("background-color","#fff");
                //         $("#text_list").children("li").eq(i).children("p").css("text-decoration","none");
                //         $("#text_list").children("li").eq(i).children("input").prop("checked", false); 
                //     } else {
                //         $("#text_list").children("li").eq(i).css("background-color","rgb(204, 232 , 207)");
                //         $("#text_list").children("li").eq(i).children("p").css("text-decoration","line-through");
                //         $("#text_list").children("li").eq(i).children("input").prop("checked", true);
                //     }         
            }
        }
    }

    // 提交事件委托
    $("#text_add").on("click", function (event) {
        if ($(".text-in").val() != "") {
            // 新建一个属性index 表格的index和数组的index一一对应
            let futureTime = prompt("请输入你预计完成的时间");
            textListDataALL.push({ "text": $(".text-in").val(), "status": 1, "id": ArrTextindex, "datetime": getDate(), "futuretime": futureTime,"checktime": 10000});
            ArrTextindex++;
            textListDataView = textListDataALL;
            textListUpdate();
            console.log(textListDataALL);
            // 后期可优化为每次提交数据后，将数据存入数组对象（json)
            // $("#text_list").append("<li><input type='checkbox' name='text-list-check' style='display: none;'><p>" + $(".text-in").val() + "</p><a href='JavaScript:void(0);'>删除</a></li>");
            // 每次添加成功后清空文本框
            $(".text-in").val("");
            // $("#text_list li p").val($(".text-in").val());
        } else {
            alert("请输入内容");
        }

    });
    //  按键监听
    $(".text-in").keydown(function (event) {
        if (event.which == 13) {
            $("#text_add").trigger("click");
        }
    });

    // 测试筛选按钮

    // 要用事件委托处理ul li
    $("#text_list").on("click", "li", function (event) {
        // console.log($(event.target));
        // 新建一个状态 1 或者 2 来检测进行筛选
        let listIndex = $(this).attr("date_index");
        let index;
        for (let i = 0; i < textListDataALL.length; i++) {
            if (textListDataALL[i].id == listIndex) {
                index = i;
            }
        }
        // console.log(textListDataALL[index]);
        
        if (textListDataALL[index].status == 1) {
            textListDataALL[index].status = 2;
        } else if (textListDataALL[index].status == 2) {
            textListDataALL[index].status = 1;
        }
        const switchObj = {
            "1": textFilter1,
            "2": textFilter2
        }
        if (filterStatus != 3) {
            textListDataView = textListDataALL.filter(switchObj[filterStatus]);
        } else {
            textListDataView = textListDataALL;
        }
        
        
        
        textListUpdate();
        return false;


        // if ($(this).children("input").prop("checked") == false) {
        //     $(this).closest("li").css("background-color","rgb(204, 232 , 207)");
        //     $(this).children("p").css("text-decoration","line-through");
        //     $(this).closest("li").children("input").prop("checked", true);
        //     // console.log($(this));
        //     // alert($(this).index());
        // } else {
        //     $(this).css("background-color","#FFF");
        //     $(this).children("p").css("text-decoration","none");
        //     $(this).children("input").prop("checked", false); 
        //     // 查看数组的索引号
        //     // alert($(this).index());
        //     // $(this).closest("li").remove();

        // }
    });

    // 删除按钮
    $("#text_list").on("click", "a", function (event) {
        // event.preventDefault();
        if ($(this).attr("id") != "edit") {
            let listIndex = $(this).closest("li").attr("date_index");
            let index;
            for (let i = 0; i < textListDataALL.length; i++) {
                if (textListDataALL[i].id == listIndex) {
                    index = i;
                }
            }
            
            var r = confirm("你是否要删除呢");
            if (r == true) {
                // console.log($(this).closest("li").attr("date_index"));
                const switchObj = {
                    "1": textFilter1,
                    "2": textFilter2,
                }
                textListDataALL.splice(index, 1);
                // textListDataView = textListDataALL;
                if (filterStatus != 3) {
                    textListDataView = textListDataALL.filter(switchObj[filterStatus]);
                } else {
                    textListDataView = textListDataALL;
                }
                textListUpdate();
                console.log(textListDataALL);
                return false
                // $(this).closest("li").remove();
            } else {
                // 事件中断
                return false;
            }
        } else {
            // 修改按钮
            // 获取当前li的date_index属性
            let listIndex = $(this).closest("li").attr("date_index");
            let index;
            // 循环总数组 判断Json内id的值与date_index是否相等 如果相等，找出对象下标
            for (let i = 0; i < textListDataALL.length; i++) {
                if (textListDataALL[i].id == listIndex) {
                    index = i;
                }
            }
            var rEdit = prompt("请输入新的数值");
            textListDataALL[index].text = rEdit;
            const switchObj={
                "1":textFilter1,
                "2":textFilter2
            }
            if (filterStatus != 3) {
                textListDataView = textListDataALL.filter(switchObj[filterStatus]);
            } else {
                textListDataView = textListDataALL;
            }
            textListUpdate();
            // 委托中断
            return false;
        }

    });

    // 筛选函数
    function textFilter1(item) {
        return item.status == 1;
    }
    function textFilter2(item) {
        return item.status == 2;
    }

    // 筛选切换
    $(".nav-right").on("click", "a", function (event) {

        $(".nav-right a").each(function () {
            $(this).removeClass("filterA");
        });
        $(this).addClass("filterA");
        if ($(this).attr("id") == "btn_1") {
            filterStatus = 1;
            textListDataView = textListDataALL.filter(textFilter1);
            textListUpdate();
        } else if ($(this).attr("id") == "btn_2") {
            filterStatus = 2;
            textListDataView = textListDataALL.filter(textFilter2);
            textListUpdate();
        } else {
            filterStatus = 3;
            textListDataView = textListDataALL;
            textListUpdate();
        }
    });





    // #########效果类############
    $("#text_list").on("mouseenter", "li", function (event) {
        // $(this).children("a").animate({width: 'show'});
        $(this).children("a").animate({ width: '80px', border: '1px solid #333' }, 160);
    });
    $("#text_list").on("mouseleave", "li", function (event) {
        $(this).children("a").animate({ width: '0', border: '1px solid #333' }, 160);
        // $(this)
    });




    // $("#text_remove").on("click",function (event) { 
    //     // console.log($("#text_list li"));
    //     // alert($(".text-in").val());
    //     // $(".text")
    //     // $("#text_list li").remove();
    //     // $(this).closest("li").remove();eq(index)
    //     // $("#text_list").closest("li").remove();
    //     debugger
    //     console.log($("#text_list li"));
    //     for (let i = 0; i < $("#text_list li").length; i++) {
    //         $("#text_list li").each(function () { 
    //             if ($(this).children("input").prop("checked") == true) {
    //                 $(this).closest("li").remove();
    //             }
    //         });


    //     }

    // });




});