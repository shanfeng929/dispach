package com.sunyard.dispatch.model;

import java.io.Serializable;
import java.util.Date;

/**
 * <b>所有实体类的基类，重写了部分方法：</b><br>
 *
 * @author Guoyan
 * @version 1.0
 */
public abstract class Model implements Serializable, Cloneable, Comparable<Model> {

    private static final long serialVersionUID = 1124787L;

    public abstract Integer getId();

    /**
     * 创建人员ID
     */
    protected Integer creator;

    /**
     * 最近修改人员ID
     */
    protected Integer modifier;

    /**
     * 创建日期
     */
    protected Date dateCreated;

    /**
     * 最近更新日期
     */
    protected Date dateUpdated;

    /**
     * 数据状态
     */
    protected Integer dataStatus;

    public Integer getCreator() {
        return creator;
    }

    public void setCreator(Integer creator) {
        this.creator = creator;
    }

    public Integer getModifier() {
        return modifier;
    }

    public void setModifier(Integer modifier) {
        this.modifier = modifier;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getDateUpdated() {
        return dateUpdated;
    }

    public void setDateUpdated(Date dateUpdated) {
        this.dateUpdated = dateUpdated;
    }

    public Integer getDataStatus() {
        return dataStatus;
    }

    public void setDataStatus(Integer dataStatus) {
        this.dataStatus = dataStatus;
    }

    @Override
    public Object clone() {
        try {
            return super.clone();
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean equals(Object obj) {
        if (obj != null && getId() != null && getClass().equals(obj.getClass())) {
            Model v = (Model) obj;
            return getId().equals(v.getId());
        }
        return false;
    }

    @Override
    public String toString() {
        return getClass().getName() + "#" + getId();
    }

    @Override
    public int compareTo(Model o) {
        if (getId() instanceof Comparable) {
            Model m = (Model) o;
            Comparable<Integer> c = (Comparable<Integer>) getId();
            return c.compareTo(m.getId());
        }
        return -1;
    }
}
