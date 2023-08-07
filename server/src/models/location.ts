import mongoose from 'mongoose';

const schema = new mongoose.Schema( {
    country: String,
    region: String,
    city: String,
    address: String,
    house_number: String
} );

export default mongoose.model( 'Location', schema );
