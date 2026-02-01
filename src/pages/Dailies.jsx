import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

function Dailies() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-primary">Dailies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This is the Dailies page. Add your daily content here.
            </p>
            <Link
              to="/"
              className="text-primary hover:text-secondary underline transition-colors"
            >
              ← Back to Home
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dailies;
