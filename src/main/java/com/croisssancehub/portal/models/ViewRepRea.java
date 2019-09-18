package com.croisssancehub.portal.models;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
//@Immutable
@Table(name = "viewreprea")
public class ViewRepRea{
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idclient",insertable = false, updatable = false)
    private long uid;

    @NotNull
    @Column(name="nameclient",insertable = false, updatable = false)
    private String nameClient;

    @NotNull
    @Column(name="latitude",insertable = false, updatable = false)
    private Double latitude;

    @NotNull
    @Column(name = "longitude",insertable = false, updatable = false)
    private Double longitude;

    @NotNull
    @Column(name = "ClientRep",insertable = false, updatable = false)
    private String idClient;

    @NotNull
    @Column(name="town",insertable = false, updatable = false)
    private String town;

    @NotNull
    @Column(name = "entreprise",insertable = false, updatable = false)
    private String entreprise;

    @NotNull
    @Column(name = "contractor",insertable = false, updatable = false)
    private String contractor;

    @NotNull
    @Column(name = "refclient",insertable = false, updatable = false)
    private String idClientRea;
    public ViewRepRea(){}

    public ViewRepRea(long id, @NotNull String nameClient, @NotNull Double latitude, @NotNull Double longitude, @NotNull String idClient, @NotNull String town, @NotNull String entreprise, @NotNull String contractor, @NotNull String idClientRea) {
        this.uid = id;
        this.nameClient = nameClient;
        this.latitude = latitude;
        this.longitude = longitude;
        this.idClient = idClient;
        this.town = town;
        this.entreprise = entreprise;
        this.contractor = contractor;
        this.idClientRea = idClientRea;
    }

    public long getIdrep() {
        return uid;
    }

    public String getNameClient() {
        return nameClient;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public String getIdClient() {
        return idClient;
    }

    public String getTown() {
        return town;
    }

    public String getEntreprise() {
        return entreprise;
    }

    public String getContractor() {
        return contractor;
    }

    public String getIdClientRea() {
        return idClientRea;
    }

    public void setIdRep(long idRep) {
        this.uid = idRep;
    }

    public void setNameClient(String nameClient) {
        this.nameClient = nameClient;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public void setIdClient(String idClient) {
        this.idClient = idClient;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public void setEntreprise(String entreprise) {
        this.entreprise = entreprise;
    }

    public void setContractor(String contractor) {
        this.contractor = contractor;
    }

    public void setIdClientRea(String idClientRea) {
        this.idClientRea = idClientRea;
    }
}
