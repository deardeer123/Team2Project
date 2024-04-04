package com.green.Team2Project.home.controller;

import com.green.Team2Project.home.service.HomeService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/")
public class HomeController {
    @Resource(name="homeService")
    HomeService homeService;

    @GetMapping("/home")
    public String helloWorld(){
        System.out.println("hello world!");

        return"content/home";
    }

}
