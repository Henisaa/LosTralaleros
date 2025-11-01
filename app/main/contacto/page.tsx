"use client";

import { useState, FormEvent } from 'react';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: '',
  });
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const allowedDomains = [
    '@duoc.cl',
    '@profesor.duoc.cl',
    '@gmail.com'
  ];

  const isEmailAllowed = (value: string) => {
    if (!value) return true; 
    const trimmed = value.trim();
    const basicFormatOk = /\S+@\S+\.\S+/.test(trimmed);
    if (!basicFormatOk) return false;
    const lower = trimmed.toLowerCase();
    return allowedDomains.some(d => lower.endsWith(d));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'message') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const nameOk = formData.fullname.trim().length > 0 && formData.fullname.trim().length <= 100;
    const emailOk = formData.email.trim().length === 0 || (formData.email.trim().length <= 100 && isEmailAllowed(formData.email));
    const msgOk = formData.message.trim().length > 0 && formData.message.trim().length <= 500;
    
    setValidated(true); 

    if (nameOk && emailOk && msgOk) {
      
      setSuccess(true);
      form.reset();
      setFormData({ fullname: '', email: '', message: '' });
      setCharCount(0);
      setValidated(false);
      
      setTimeout(() => setSuccess(false), 3000);
    } else {
      
      setSuccess(false);
    }
  };

  
  const nameInvalid = validated && (formData.fullname.trim().length === 0 || formData.fullname.trim().length > 100);
  const emailInvalid = validated && formData.email.trim().length > 0 && (formData.email.trim().length > 100 || !isEmailAllowed(formData.email));
  const msgInvalid = validated && (formData.message.trim().length === 0 || formData.message.trim().length > 500);

  return (
    <>
      <section className="text-center" style={{ padding: '4rem 1rem', background: 'linear-gradient(135deg, #eaf1ff, #fff)' }}>
        <h2>Contacto Los Tralaleros</h2>
        <p className="lead fs-5" style={{ color: '#444' }}>En lo que necesites contáctanos.</p>
      </section>

      <section className="py-4 py-md-5">
        <div className="container">
          <div className="d-flex align-items-center justify-content-center">
            <div className="w-100" style={{ maxWidth: '640px' }}>
              
              {success && (
                <div id="successAlert" className="alert alert-success" role="alert">
                  ¡Mensaje enviado correctamente!
                </div>
              )}

              <form id="contactForm" noValidate onSubmit={handleSubmit}>
                <div className="card shadow-sm border-0">
                  <div className="card-body p-4 p-xl-5">
                    <div className="row gy-4">
                      <div className="col-12">
                        <label htmlFor="fullname" className="form-label">Nombre Completo <span className="text-danger">*</span></label>
                        <input 
                          type="text" 
                          className={`form-control ${nameInvalid ? 'is-invalid' : (validated && formData.fullname ? 'is-valid' : '')}`}
                          id="fullname" 
                          name="fullname" 
                          maxLength={100} 
                          required 
                          value={formData.fullname}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">El nombre es obligatorio y debe tener máximo 100 caracteres.</div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="bi bi-envelope"></i>
                          </span>
                          <input 
                            type="email" 
                            className={`form-control ${emailInvalid ? 'is-invalid' : ''}`}
                            id="email" 
                            name="email" 
                            maxLength={100} 
                            placeholder="usuario@dominio.com" 
                            value={formData.email}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">Correo no válido o dominio no permitido (.duoc.cl, .profesor.duoc.cl o .gmail.com).</div>
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="message" className="form-label">Comentario <span className="text-danger">*</span></label>
                        <textarea 
                          className={`form-control ${msgInvalid ? 'is-invalid' : (validated && formData.message ? 'is-valid' : '')}`}
                          id="message" 
                          name="message" 
                          rows={4} 
                          maxLength={500} 
                          required
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                        <div className="form-text text-end"><span id="charCount">{charCount}</span>/500</div>
                        <div className="invalid-feedback">El comentario es obligatorio y debe tener máximo 500 caracteres.</div>
                      </div>

                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn btn-primary btn-lg" type="submit">Enviar mensaje</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}