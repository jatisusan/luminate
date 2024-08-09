import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {

    const { keyword: urlKeyword } = useParams();
    const [keyword, setKeyword] = useState(urlKeyword || "");
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword.trim()}`);
            setKeyword("");
        } else {
            navigate("/");
        }
    }

	return (
		<Form onSubmit={submitHandler} className="mt-4 d-flex">
			<Form.Control
				type="text"
				value={keyword}
				placeholder="Search blogs......"
                onChange={(e) => setKeyword(e.target.value)}
                style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}
            />
            <Button type="submit" variant="warning" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}><IoIosSearch size={22}/></Button>
		</Form>
	);
};

export default SearchBar;
