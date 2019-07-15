package com.croisssancehub.portal.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="t_realised")
public class Realisation implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="commune")
    private String commune;

    @Column(name="address")
    private String address;

    @Column(name="avenue")
    private String avenue;

    @Column(name="num_home")
    private String numHome;

    @Column(name="phone")
    private String phone;

    @Column(name="town")
    private String town;

    @Column(name="type_branch")
    private String typeBranche;

    @Column(name="water_given")
    private String waterGiven;

    @Column(name="entreprise")
    private String entreprise;

    @Column(name="consultant")
    private String consultant;

    @Column(name="geopoint")
    private String geopoint;

    @Column(name="lat")
    private Double lat;

    @Column(name="lng")
    private Double lng;

    @Column(name="altitude")
    private Double altitude;

    @Column(name="precision")
    private Double precision;

    @Column(name="comments")
    private String comments;

    @Column(name="submission_time")
    private String submission_time;

    @Column(name="lot")
    private int lot;

    @Column(name="date_export")
    private String DateExport;

    @Column(name="ref_client")
    private String refClient;

    @Column(name="client")
    private String client;

    public Realisation(String commune, String address, String avenue, String numHome, String phone, String town, String typeBranche, String waterGiven, String entreprise, String consultant, String geopoint, Double lat, Double lng, Double altitude, Double precision, String comments, String submission_time, int lot, String dateExport, String refClient, String client) {
        this.commune = commune;
        this.address = address;
        this.avenue = avenue;
        this.numHome = numHome;
        this.phone = phone;
        this.town = town;
        this.typeBranche = typeBranche;
        this.waterGiven = waterGiven;
        this.entreprise = entreprise;
        this.consultant = consultant;
        this.geopoint = geopoint;
        this.lat = lat;
        this.lng = lng;
        this.altitude = altitude;
        this.precision = precision;
        this.comments = comments;
        this.submission_time = submission_time;
        this.lot = lot;
        DateExport = dateExport;
        this.refClient = refClient;
        this.client = client;
    }

    public String getRefClient() {
        return refClient;
    }

    public void setRefClient(String refClient) {
        this.refClient = refClient;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public  Realisation(){}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCommune() {
        return commune;
    }

    public void setCommune(String commune) {
        this.commune = commune;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAvenue() {
        return avenue;
    }

    public void setAvenue(String avenue) {
        this.avenue = avenue;
    }

    public String getNumHome() {
        return numHome;
    }

    public void setNumHome(String numHome) {
        this.numHome = numHome;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getTown() {
        return town;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public String getTypeBranche() {
        return typeBranche;
    }

    public void setTypeBranche(String typeBranche) {
        this.typeBranche = typeBranche;
    }

    public String getWaterGiven() {
        return waterGiven;
    }

    public void setWaterGiven(String waterGiven) {
        this.waterGiven = waterGiven;
    }

    public String getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(String entreprise) {
        this.entreprise = entreprise;
    }

    public String getConsultant() {
        return consultant;
    }

    public void setConsultant(String consultant) {
        this.consultant = consultant;
    }

    public String getGeopoint() {
        return geopoint;
    }

    public void setGeopoint(String geopoint) {
        this.geopoint = geopoint;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public Double getAltitude() {
        return altitude;
    }

    public void setAltitude(Double altitude) {
        this.altitude = altitude;
    }

    public Double getPrecision() {
        return precision;
    }

    public void setPrecision(Double precision) {
        this.precision = precision;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getSubmission_time() {
        return submission_time;
    }

    public void setSubmission_time(String submission_time) {
        this.submission_time = submission_time;
    }

    public int getLot() {
        return lot;
    }

    public void setLot(int lot) {
        this.lot = lot;
    }

    public String getDateExport() {
        return DateExport;
    }

    public void setDateExport(String dateExport) {
        DateExport = dateExport;
    }
}
