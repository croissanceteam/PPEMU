package com.croisssancehub.portal.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Root
 */
@Entity
@Table(name="t_root")
public class Root implements java.io.Serializable{

    public Root(Long id, String tournee, String avenue, String numParcelle, String refClient, String client,
			String phone, String secteur, int lot, String dateReference) {
		super();
		this.id = id;
		this.tournee = tournee;
		this.avenue = avenue;
		this.numParcelle = numParcelle;
		this.refClient = refClient;
		this.client = client;
		this.phone = phone;
		this.secteur = secteur;
		this.lot = lot;
		this.dateReference = dateReference;
	}

	public Root() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="tournee")
    private String tournee;

    @Column(name="avenue")
    private String avenue;

    @Column(name = "numparcelle")
    private String numParcelle;

    @Column(name="refclient")
    private String refClient;

    @Column(name="client")
    private String client;
    @Column(name = "phone")
    private String phone;

    @Column(name="secteur")
    private String secteur;

    @Column(name="lot")
    private int  lot;
    
    @Column(name="date_reference")
    private String dateReference;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTournee() {
		return tournee;
	}

	public void setTournee(String tournee) {
		this.tournee = tournee;
	}

	public String getAvenue() {
		return avenue;
	}

	public void setAvenue(String avenue) {
		this.avenue = avenue;
	}

	public String getNumParcelle() {
		return numParcelle;
	}

	public void setNumParcelle(String numParcelle) {
		this.numParcelle = numParcelle;
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

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getSecteur() {
		return secteur;
	}

	public void setSecteur(String secteur) {
		this.secteur = secteur;
	}

	public int getLot() {
		return lot;
	}

	public void setLot(int lot) {
		this.lot = lot;
	}

	public String getDateReference() {
		return dateReference;
	}

	public void setDateReference(String dateReference) {
		this.dateReference = dateReference;
	}
    
    
}