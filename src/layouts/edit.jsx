import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import PropTypes from "prop-types"
import api from "../api"
import { validator } from "../utils/validator"
import TextField from "../components/common/form/textField"
import SelectField from "../components/common/form/selectField"
import RadioField from "../components/common/form/radioField"
import MultiSelectField from "../components/common/form/multiSelectField"

const Edit = ({ userId }) => {
    const history = useHistory()

    const [data, setData] = useState({
        email: "",
        name: "",
        profession: "",
        sex: "male",
        qualities: []
    })

    const [user, setUser] = useState()
    const [professions, setProfessions] = useState([])
    const [qualities, setQualities] = useState({})
    const [userQualities, setUserQualities] = useState([])
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState({})

    const transformQualities = (qualities = []) => {
        return qualities.map((quality) => ({
            value: quality._id,
            label: quality.name
        }))
    }

    useEffect(() => {
        setLoading(true)
        api.users.getById(userId).then((data) => {
            setUser(data)
            setUserQualities(transformQualities(data.qualities))
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        setLoading(true)
        api.professions.fetchAll().then((data) => {
            setProfessions(data)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        setLoading(true)
        api.qualities.fetchAll().then((data) => {
            setQualities(data)
            setLoading(false)
        })
    }, [])

    const handleChange = (target) => {
        console.log(target.value)
        let value = target.value

        if (target.name === "profession") {
            const professionArray = Object.keys(professions).map(
                (professionName) => ({
                    ...professions[professionName]
                })
            )
            value = {
                _id: target.value,
                name: professionArray.find((item) => item._id === target.value)
                    .name
            }
        }

        if (target.name === "qualities") {
            const quailitiyArray = Object.keys(qualities).map(
                (qualityName) => ({
                    ...qualities[qualityName]
                })
            )

            value = target.value.map((item) => ({
                _id: item.value,
                name: item.label,
                color: quailitiyArray.find(
                    (quality) => quality._id === item.value
                ).color
            }))
        }

        setUser((prevState) => ({ ...prevState, [target.name]: value }))

        setData((prevState) => ({ ...prevState, [target.name]: value }))
    }

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        }
    }

    useEffect(() => {
        validate()
    }, [data])

    useEffect(() => {
        validate()
    }, [user])

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0

    const handleSubmit = (e) => {
        e.preventDefault()

        const isValid = validate()

        if (!isValid) return
        api.users
            .update(user._id, user)
            .then(history.replace(`/users/${user._id}`))
            .catch((error) => console.log(error))
    }

    return loading ? (
        <h2>Loading...</h2>
    ) : (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            error={errors.email}
                        />

                        <RadioField
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" }
                            ]}
                            value={user.sex}
                            name="sex"
                            onChange={handleChange}
                            label="Выберите ваш пол"
                        />

                        <SelectField
                            defaultOption="Выберите вашу профессию"
                            options={professions}
                            onChange={handleChange}
                            name="profession"
                            value={user.profession._id}
                            error={errors.profession}
                            label="Выберите вашу профессию"
                            loading={loading}
                        />

                        <MultiSelectField
                            options={qualities}
                            onChange={handleChange}
                            defaultValue={userQualities}
                            name="qualities"
                            label="Выберите ваши качества"
                        />

                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Обновить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

Edit.propTypes = {
    userId: PropTypes.string
}

export default Edit
