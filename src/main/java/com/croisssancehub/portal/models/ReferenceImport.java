package com.croisssancehub.portal.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="t_reperage_import")
public class ReferenceImport implements java.io.Serializable{

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")

    private Long id;


	public ReferenceImport(Long id, String nameClient, String avenue, String numHome, String commune, String phone,
			String category, String refClient, String pointVente, String geopoint, Double lat, Double lng,
			Double altitude, Double precision, String controller_name, String comments, String submission_time,
			String town, int lot, String date_export, String secteur, Boolean matching, Boolean errorMatching,
			String issue, Boolean clean, String idKobo) {
		super();
		this.id = id;
		this.nameClient = nameClient;
		this.avenue = avenue;
		this.numHome = numHome;
		this.commune = commune;
		this.phone = phone;
		this.category = category;
		this.refClient = refClient;
		this.pointVente = pointVente;
		this.geopoint = geopoint;
		this.lat = lat;
		this.lng = lng;
		this.altitude = altitude;
		this.precision = precision;
		this.controller_name = controller_name;
		this.comments = comments;
		this.submission_time = submission_time;
		this.town = town;
		this.lot = lot;
		this.date_export = date_export;
		this.secteur = secteur;
		this.matching = matching;
		this.errorMatching = errorMatching;
		this.issue = issue;
		this.clean = clean;
		this.idKobo = idKobo;
	}

	public String getSecteur() {
		return secteur;
	}

	public void setSecteur(String secteur) {
		this.secteur = secteur;
	}

	public Boolean getMatching() {
		return matching;
	}

	public void setMatching(Boolean matching) {
		this.matching = matching;
	}

	public Boolean getErrorMatching() {
		return errorMatching;
	}

	public void setErrorMatching(Boolean errorMatching) {
		this.errorMatching = errorMatching;
	}

	public String getIssue() {
		return issue;
	}

	public void setIssue(String issue) {
		this.issue = issue;
	}

	public Boolean getClean() {
		return clean;
	}

	public void setClean(Boolean clean) {
		this.clean = clean;
	}

	public String getIdKobo() {
		return idKobo;
	}

	public void setIdKobo(String idKobo) {
		this.idKobo = idKobo;
	}

	public ReferenceImport() {
	}


    @Column(name="name_client")
    private String nameClient;
    @Column(name="avenue")
    private String avenue;

    @Column(name="num_home")
    private String numHome;

    @Column(name = "commune")
    private String commune;

    @Column(name="phone")
    private String phone;

    @Column(name="category")
    private String category;

    @Column(name = "ref_client")
    private String refClient;

    @Column(name="pt_vente")
    private String pointVente;

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

    @Column(name="controller_name")
    private String controller_name;

    @Column(name="comments")
    private String comments;

    @Column(name="submission_time")
    private String submission_time;

    @Column(name="town")
    private String town;

    @Column(name="lot")
    private int lot;

    @Column(name="date_export")
    private String date_export;

    @Column(name = "secteur")
    private String secteur;

	@Column(name = "matching")
	private Boolean matching;

	@Column(name = "error_matching")
	private Boolean errorMatching;

	@Column(name = "issue")
	private String issue;

	@Column(name = "clean")
	private Boolean clean;

	@Column(name = "_id")
	private String  idKobo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameClient() {
        return nameClient;
    }

    public void setNameClient(String nameClient) {
        this.nameClient = nameClient;
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

    public String getCommune() {
        return commune;
    }

    public void setCommune(String commune) {
        this.commune = commune;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getRefClient() {
        return refClient;
    }

    public void setRefClient(String refClient) {
        this.refClient = refClient;
    }

    public String getPointVente() {
        return pointVente;
    }

    public void setPointVente(String pointVente) {
        this.pointVente = pointVente;
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

    public String getController_name() {
        return controller_name;
    }

    public void setController_name(String controller_name) {
        this.controller_name = controller_name;
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

    public String getTown() {
        return town;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public int getLot() {
        return lot;
    }

    public void setLot(int lot) {
        this.lot = lot;
    }

    public String getDate_export() {
        return date_export;
    }

    public void setDate_export(String date_export) {
        this.date_export = date_export;
    }

}
