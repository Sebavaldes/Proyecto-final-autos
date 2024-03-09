import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ListUserPage() {
    const [cars, setCars] = useState([]);
    const user_id = localStorage.getItem('user_id');

    useEffect(() => {
        getCars();
    }, []);

    function getCars() {
        axios.get('http://localhost:5000/listusers')
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('Error fetching cars:', error);
            });
    }

    function deleteCar(id) {
        axios.delete(`http://localhost:5000/cars/${id}`, {
            headers: { Authorization: `Bearer ${user_id}` }
        })
            .then(() => {
                setCars(cars.filter(car => car.id !== id));
            })
            .catch(error => {
                console.error('Error deleting car:', error);
            });
    }


    return (
        <div>
            <div className="container h-100">
                <div className="row h-100">
                    <div className="col-12">
                        <h1>List cars</h1>
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Carname</th>
                                    <th>Automatic</th>
                                    <th>Model</th>
                                    <th>Price</th>
                                    <th>Speed</th>
                                    <th>Description</th>
                                    <th>Imagen</th>
                                    <th>Info</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>

                                {cars.map((car, index) => (
                                    <tr key={index}>
                                        <td>{car.carName}</td>
                                        <td>{car.automatic}</td>
                                        <td>{car.model}</td>
                                        <td>{car.price}</td>
                                        <td>{car.speed}</td>
                                        <td>{car.description}</td>
                                        <td>{car.user_id}</td>
                                        <td>
                                            <img src={car.image_url} alt="" className="img-fluid rounded" />
                                        </td>
                                        <td>
                                            {car.user_id === user_id && (
                                                <button onClick={() => deleteCar(car.id)}>Eliminar</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );


}


