package com.yingshi.utils;

import com.qiniu.http.Response;
import com.qiniu.storage.UploadManager;
import com.qiniu.util.Auth;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;

/**
 * 上传图片
 * Created by knight on 15/6/25.
 */
@Service
public class UploadUtils {

    private static String ACCESS_KEY = "aiCIMf0rC37GJVdLUnasBsspsskETumVePxKd65k";
    private static String SECRET_KEY = "eQvrQrMqQotKRqTEwTjdD6DeCg5ImD6aIJPSPemF";

    private static UploadManager uploadManager = new UploadManager();
    private static Auth auth = Auth.create(ACCESS_KEY, SECRET_KEY);


    /**
     * 上传图片至7牛
     */
    public static String uploadTo7niu(String name, byte[] file) {

//        String suffix = file.getOriginalFilename().contains(".")?"." +file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1):"";

        String key = name +  DateFormatUtils.format(new Date(), "yyyyMMddHHmmssSSS");

        String BASIC_URL = "http://res.ys-1v1.com/";
        String url = BASIC_URL + key;

        String BUCKET_NAME = "yingshi";
        String token = auth.uploadToken(BUCKET_NAME, key);

        try {
            Response res = uploadManager.put(file, key, token);
        } catch (IOException e) {
            return "{\"ret_code\" : -1, \"message\" : \"上传失败\"}";
        }
        return url;
    }



}
