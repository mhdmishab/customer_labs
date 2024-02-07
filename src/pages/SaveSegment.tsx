import React, { useEffect, useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import './Modal.css';

function SaveSegment() {
    const [segment, setSegment] = useState<{ label: string; value: string }[]>([]);
    const [selected, setSelected] = useState<{ label: string; value: string }[]>([]);
    const [modal, setModal] = useState(false);
    const [segmentKey, setSegmentKey] = useState(0);
    const [name, setName] = useState('');

    interface SegmentItem {
        label: string;
        value: string;
    }

    const data: SegmentItem[] = [
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'State', value: 'state' },
    ];

    const [dropData, setDropData] = useState<{ label: string; value: string }[]>(data);

    const onSelect = (selectedList: { label: string; value: string }[]) => {
        setSelected(selectedList);
    };

    useEffect(() => {
        setDropData(data);
    }, []);

    const onRemove = (selectedList: { label: string; value: string }[]) => {
        setSelected(selectedList);
    };

    const handleSchema = () => {
        console.log(selected);
        console.log(name);
        setSegment(selected);
        setSegmentKey(segmentKey + 1);
        const filteredOptions = data.filter((item) => !selected.find((selectedItem) => selectedItem.value === item.value));
        setDropData(filteredOptions);
        // setSelected([]);
    };

    const deleteSchema = (valueToDelete: string) => {
        const filteredSegment = segment.filter((value: SegmentItem) => value.value !== valueToDelete);
        const filteredOption = data.find((item: SegmentItem) => item.value === valueToDelete);
        setSegment(filteredSegment);

        if (filteredOption) {
            setDropData([...dropData, filteredOption]);
        }
    };

    const handleSubmit = () => {
        const segment_array = segment.map((value: SegmentItem) => ({
            [value.value]: value.label,
        }));

        const data = {
            segment_name: name,
            schema: segment_array,
        };

        fetch('https://webhook.site/a21daee5-66bc-46de-9999-e1dcd30279b1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Server response:', data);
                location.reload();
            })
            .catch((error) => {
                console.error('Error sending data to the server:', error);
            });
    };

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

    return (
        <>
            <div className="">
                <div className="w-screen">
                    <header className="w-full bg-blue-300 h-20"></header>
                    <div className="p-6 w-full">
                        <button className="bg-gray-300 text-black p-2 border" onClick={toggleModal}>
                            Save segment
                        </button>
                    </div>
                </div>
            </div>
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="mt-1 modal-content flex-col justify-around items-center">
                        <form>
                            <header className="w-full bg-blue-300 h-20 modal-header p-2 flex justify-start items-center">
                                <button className="m-1" onClick={toggleModal}>
                                    X
                                </button>
                                Save Segment
                            </header>

                            <div className="p-2 flex-col justify-start">
                                <div className="flex-col justify-center items-center m-3">
                                    <h3>Enter the Name of the Segment</h3>
                                    <input
                                        className="w-96 h-10 p-4 mt-4 border border-black"
                                        placeholder="Name of the Segment"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                    />
                                    <p className="p-2 mt-5">To save your segment, you need to add the schemas to build the query</p>
                                    <div className="p-4 flex justify-end items-center">
                                        <div className="rounded-full bg-green-500 w-2 h-2"></div>
                                        <span className="text-xs ml-1"> - User Traits</span>
                                        <div className="ml-2 rounded-full bg-red-500 w-2 h-2"></div>
                                        <span className="text-xs ml-1"> - Group Traits</span>
                                    </div>
                                </div>
                                {segment && (
                                    <div className="flex-col justify-center items-center m-3">
                                        {segment?.map((value: SegmentItem, index) => (
                                            <div className="flex" key={segmentKey + index}>
                                                <Multiselect
                                                    key={segmentKey + index}
                                                    placeholder={value.label}
                                                    style={{ multiselectContainer: { width: '20rem', height: '2.5rem' } }}
                                                    hideSelectedList
                                                    showArrow
                                                    showCheckbox
                                                    className="mt-4 bg-white h-10 border border-black"
                                                />
                                                <div
                                                    className="w-10 h-10 p-4 mt-4 ml-3 bg-green-200 flex justify-center items-center"
                                                    onClick={() => {
                                                        deleteSchema(value.value);
                                                    }}
                                                >
                                                    -
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex-col justify-center items-center m-3">
                                    <div className="flex">
                                        <Multiselect
                                            showCheckbox
                                            onSelect={onSelect}
                                            onRemove={onRemove}
                                            style={{ multiselectContainer: { width: '20rem', height: '2.5rem' } }}
                                            hideSelectedList
                                            showArrow
                                            placeholder="Add Schema to Segment"
                                            className="mt-4 bg-white h-10 border border-black"
                                            options={dropData}
                                            displayValue="label"
                                        />
                                        <div className="w-10 h-10 p-4 mt-4 ml-3 bg-green-200 flex justify-center items-center">-</div>
                                    </div>
                                </div>
                                <div className="flex m-4" onClick={handleSchema}>
                                    + <span className="text-green-600 font-bold text-sm underline">Add new Schema</span>
                                </div>
                            </div>

                            <footer className="w-full bg-slate-300 h-20 flex justify-start items-center footer-modal">
                                <div
                                    className="p-2 h-10 bg-green-500 rounded-sm m-2 text-white font-semibold"
                                    onClick={handleSubmit}
                                >
                                    Save the Segment
                                </div>
                                <button
                                    className="p-2 h-10 bg-white text-red-500 rounded-sm font-semibold"
                                    onClick={toggleModal}
                                >
                                    Cancel
                                </button>
                            </footer>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default SaveSegment;
