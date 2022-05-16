import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Resizer from 'react-image-file-resizer';
import { Badge } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import AdminRoute from '../routes/AdminRoutes';
import Layout from '../layout/Layout';

const CreateNewWork = () => {
  // router
  const router = useRouter();

  const [values, setValues] = useState({
    name: '',
    url: '',
    loading: false,
    uploading: false,
  });

  const [image, setImage] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [uploadButtonText, setUploadButtonText] =
    useState('Upload Cover Image');

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    setImagePreview(window.URL.createObjectURL(file));
    // show image name
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });
    // resize image and send image to backend
    Resizer.imageFileResizer(file, 720, 500, 'JPEG', 100, 0, async (uri) => {
      try {
        let { data } = await axios.post(`/api/author/resources/image`, {
          image: uri,
        });
        // console.log('IMAGE UPLOADED', data);
        // set image in the state
        setImage(data);
        setValues({ ...values, loading: false });
        toast.success('Image Uploaded Successfully');
      } catch (err) {
        // console.log(err);
        setValues({ ...values, loading: false });
        toast.error('Image upload failed. Try later');
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setValues({ ...values, loading: true });
      const { data } = await axios.post(`/api/admin/ourworks`, {
        ...values,
        image,
      });
      //console.log(data);
      setValues({ ...values, name: '', url: '', loading: false });
      // SetCategories([]);
      setImagePreview('');
      setUploadButtonText('Upload Cover Image');
      router.push('/admin/our-works');
      toast.success('Great! new work added successfully');
    } catch (err) {
      toast.error(err.response.data);
      setValues({ ...values, loading: false });
    }
  };

  return (
    <Layout title="Create New Work">
      <AdminRoute>
        <h1 className="lead">Create New Work</h1>
        <hr />
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group py-2">
                    <input
                      className="form-control"
                      name="name"
                      type="text"
                      placeholder="Enter company name"
                      onChange={handleChange}
                      value={values.name}
                      required
                    />
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label
                        style={{ width: '100%' }}
                        className="btn btn-outline-secondary btn-block  text-left mt-3 "
                      >
                        {/* {values.loading ? 'uploading' : 'Image Upload'} */}
                        {values.loading ? 'saving image' : uploadButtonText}
                        <input
                          type="file"
                          name="image"
                          size="large"
                          onChange={handleImage}
                          accept="image/*"
                          hidden
                        />
                      </label>
                    </div>
                  </div>

                  <div className="d-grid gap-2 my-2">
                    <button
                      disabled={values.loading || values.uploading}
                      loading={values.loading}
                      className="btn btn-primary my-2"
                      type="submit"
                    >
                      {/* {loading ? <SyncOutlined spin /> : 'Submit'} */}
                      {values.loading ? (
                        <SyncOutlined spin />
                      ) : (
                        'Save & Continue'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Categories</h5>
              </div>
            </div>

            {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
            {/* <pre>{JSON.stringify(description, null, 4)}</pre> */}
          </div>
        </div>
      </AdminRoute>
    </Layout>
  );
};

export default CreateNewWork;
