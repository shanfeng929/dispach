package com.sunyard.dispatch.util;

import java.util.List;
import java.util.Map;

import com.rideasoft.commons.util.Page;

/**
 * <b>SpringMVC通用json返回对象，约定统一使用此对象</b><br>
 *
 * @author Guoyan
 * @version 1.0
 */
public class JsonResult<T> {

    private Boolean success;

    private Page<T> pageItems;

    private List<T> listItems;

    private Map<String, Object> mapItems;

    private T item;

    private String message;

    public JsonResult() {
        super();
    }

    public JsonResult(Boolean success) {
        this.success = success;
    }

    public JsonResult(Boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public JsonResult(Page<T> pageItems) {
        this.pageItems = pageItems;
    }

    public JsonResult(List<T> listItems) {
        this.listItems = listItems;
    }

    public JsonResult(Map<String, Object> mapItems) {
        this.mapItems = mapItems;
    }

    public JsonResult(Boolean success, Page<T> pageItems) {
        this.success = success;
        this.pageItems = pageItems;
    }

    public JsonResult(Boolean success, List<T> listItems) {
        this.success = success;
        this.listItems = listItems;
    }

    public JsonResult(Boolean success, Map<String, Object> mapItems) {
        this.success = success;
        this.mapItems = mapItems;
    }

    public JsonResult(Boolean success, String message, Page<T> pageItems) {
        this.success = success;
        this.message = message;
        this.pageItems = pageItems;
    }

    public JsonResult(Boolean success, String message, List<T> listItems) {
        this.success = success;
        this.message = message;
        this.listItems = listItems;
    }

    public JsonResult(Boolean success, String message, Map<String, Object> mapItems) {
        this.success = success;
        this.message = message;
        this.mapItems = mapItems;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public Page<T> getPageItems() {
        return pageItems;
    }

    public void setPageItems(Page<T> pageItems) {
        this.pageItems = pageItems;
    }

    public List<T> getListItems() {
        return listItems;
    }

    public void setListItems(List<T> listItems) {
        this.listItems = listItems;
    }

    public Map<String, Object> getMapItems() {
        return mapItems;
    }

    public void setMapItems(Map<String, Object> mapItems) {
        this.mapItems = mapItems;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getItem() {
        return item;
    }

    public void setItem(T item) {
        this.item = item;
    }
}
