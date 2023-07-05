import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { validator } from "../../../utils/validator"
import TextField from "../../common/form/textField"
import SelectField from "../../common/form/selectField"
import RadioField from "../../common/form/radioField"
import MultiSelectField from "../../common/form/multiSelectField"
import BackHistoryButton from "../../common/backButton"
import { useQualities } from "../../../hooks/useQualities"
import { useProfessions } from "../../../hooks/useProfession"
import { useAuth } from "../../../hooks/useAuth"

const EditUserPage = () => {
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    })
    const { currentUser, updateUser } = useAuth()
    const [errors, setErrors] = useState({})

    function getQualities(qualitiesIds) {
        const qualitiesArray = []
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality)
                    break
                }
            }
        }
        return qualitiesArray
    }

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const { professions, isLoading: professionLoading } = useProfessions()
    const professionList = professions.map((profession) => ({
        label: profession.name,
        value: profession._id
    }))

    const { qualities, isLoading: qualityLoading } = useQualities()
    const qualityList = qualities.map((quality) => ({
        label: quality.name,
        value: quality._id,
        color: quality.color
    }))

    const isValid = Object.keys(errors).length === 0

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        await updateUser({
            ...data,
            qualities: data.qualities.map((q) => q.value)
        })

        history.push(`/users/${currentUser._id}`)
    }

    const transformQualities = (data) => {
        const result = getQualities(data).map((qual) => ({
            label: qual.name,
            value: qual._id
        }))
        return result
    }

    useEffect(() => {
        if (!professionLoading && !qualityLoading && currentUser && !data) {
            setData(() => ({
                ...currentUser,
                qualities: transformQualities(currentUser.qualities)
            }))
        }
    }, [professionLoading, qualityLoading, currentUser, data])

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false)
        }
    }, [data])

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    }
    useEffect(() => {
        validate()
    }, [data])

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    return !isLoading && data ? (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4 mb-3">
                    <BackHistoryButton />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />

                        <TextField
                            label="Email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />

                        <RadioField
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" }
                            ]}
                            value={data.sex}
                            name="sex"
                            label="Choose your gender..."
                            onChange={handleChange}
                        />

                        <SelectField
                            label="Choose your profession..."
                            value={data.profession}
                            onChange={handleChange}
                            defaultOption="Choose..."
                            name="profession"
                            loading={isLoading}
                            options={professionList}
                            error={errors.profession}
                        />

                        <MultiSelectField
                            options={qualityList}
                            onChange={handleChange}
                            defaultValue={data.qualities}
                            name="qualities"
                            label="Choose your qualities..."
                            error={errors.qualities}
                        />

                        <button
                            type="submit"
                            className="btn btn-primary w-100 mx-auto"
                            disabled={!isValid}
                        >
                            Update data
                        </button>
                    </form>
                </div>
            </div>
        </div>
    ) : (
        <h2>Loading...</h2>
    )
}

export default EditUserPage
